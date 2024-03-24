package response

import (
	"fmt"
	"net/http"
	"time"

	em "emperror.dev/errors"
	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/kuan0808/story-frame/backend/pkg/code"
)

// Fail returns Rspfail.
func Fail(err error) (int, interface{}) {
	return http.StatusInternalServerError, &map[string]interface{}{
		"message": err.Error(),
		"status":  http.StatusInternalServerError,
	}
}

// Abort responses the failed info in JSON format and abort this session.
func Abort(c *gin.Context, err error) {
	c.JSON(Fail(err))
	c.Abort()
}

// AbortByAny .
func AbortByAny(c *gin.Context, anyError interface{}) {
	switch errObject := anyError.(type) {
	case validator.ValidationErrors:
		ErrorWithMsg(c, http.StatusBadRequest, code.ParamIncorrect, errObject.Error())
	case error:
		unwrappedErr := em.Unwrap(errObject)
		if unwrappedErr != nil {
			AbortByAny(c, unwrappedErr)
			return
		}
		ErrorWithMsg(c, http.StatusInternalServerError, code.UnknownError, errObject.Error())
	default:
		ErrorWithMsg(c, http.StatusInternalServerError, code.UnknownError, fmt.Sprintf("%v", anyError))
	}
}

// OKResp is the ok response struct
type OKResp struct {
	Code int         `json:"code"`
	Data interface{} `json:"data,omitempty"`
}

// OK responses code and data in JSON format.
func OK(ctx *gin.Context, data interface{}) {
	ctx.JSON(http.StatusOK, &OKResp{
		Code: 0,
		Data: data,
	})
}

// CreatedResp is the created response struct
type CreatedResp struct {
	Code int         `json:"code"`
	Data interface{} `json:"data,omitempty"`
}

// Created responses code and data in JSON format.
func Created(ctx *gin.Context, data interface{}) {
	ctx.JSON(http.StatusCreated, &CreatedResp{
		Code: 0,
		Data: data,
	})
}

// Paging is the paging struct
type Paging struct {
	PageNumber int    `json:"page_number"`
	PageSize   int    `json:"page_size"`
	TotalCount int    `json:"total_count"`
	PageSort   string `json:"page_sort"`
}

// OKWithPagingResp is the ok response struct
type OKWithPagingResp struct {
	OKResp
	Paging Paging `json:"paging,omitempty"`
}

// OKWithPaging responses code and data and paging in JSON format.
func OKWithPaging(ctx *gin.Context, data any, paging Paging) {
	ctx.JSON(http.StatusOK, &OKWithPagingResp{
		OKResp: OKResp{
			Code: 0,
			Data: data,
		},
		Paging: paging,
	})
}

// ErrorResp is the error response struct.
type ErrorResp struct {
	Status    int    `json:"status"`
	Code      int    `json:"code"`
	RequestID string `json:"request_id"`
	Message   string `json:"message"`
	Path      string `json:"path"`
	Timestamp int64  `json:"timestamp"`
}

// ForbiddenError .
func ForbiddenError(ctx *gin.Context, code int) {
	ForbiddenErrorWithMsg(ctx, code, "")
}

// ForbiddenErrorWithMsg .
func ForbiddenErrorWithMsg(ctx *gin.Context, code int, msg string) {
	if msg == "" {
		msg = "403 FORBIDDEN"
	}
	ErrorWithMsg(ctx, http.StatusForbidden, code, msg)
}

// NotFoundWithMsg .
func NotFoundWithMsg(ctx *gin.Context, code int, msg string) {
	if msg == "" {
		msg = "404 NOT FOUND"
	}
	ErrorWithMsg(ctx, http.StatusNotFound, code, msg)
}

// BadRequest .
func BadRequest(ctx *gin.Context, code int) {
	ErrorWithMsg(ctx, http.StatusBadRequest, code, "")
}

// BadRequestWithMsg .
func BadRequestWithMsg(ctx *gin.Context, code int, msg string) {
	if msg == "" {
		msg = "400 BAD REQUEST"
	}
	ErrorWithMsg(ctx, http.StatusBadRequest, code, msg)
}

// Unauthorized .
func Unauthorized(ctx *gin.Context, code int) {
	ErrorWithMsg(ctx, http.StatusUnauthorized, code, "")
}

// UnauthorizedWithMsg .
func UnauthorizedWithMsg(ctx *gin.Context, code int, msg string) {
	if msg == "" {
		msg = "401 UNAUTHORIZED"
	}
	ErrorWithMsg(ctx, http.StatusUnauthorized, code, msg)
}

// TooManyRequestsWithMsg .
func TooManyRequestsWithMsg(ctx *gin.Context, code int, msg string) {
	if msg == "" {
		msg = "429 TOO MANY REQUESTS"
	}
	ErrorWithMsg(ctx, http.StatusTooManyRequests, code, msg)
}

// InternalServerError .
func InternalServerError(ctx *gin.Context, code int) {
	ErrorWithMsg(ctx, http.StatusInternalServerError, code, "")
}

// InternalServerErrorWithMsg .
func InternalServerErrorWithMsg(ctx *gin.Context, code int, msg string) {
	if msg == "" {
		msg = "500 INTERNAL SERVER ERROR"
	}
	ErrorWithMsg(ctx, http.StatusInternalServerError, code, msg)
}

// ErrorWithMsg .
func ErrorWithMsg(ctx *gin.Context, status int, code int, msg string) {
	if msg == "" {
		msg = "ERROR"
	}
	var err = &ErrorResp{
		Status:    status,
		Code:      code,
		RequestID: requestid.Get(ctx),
		Message:   msg,
		Path:      ctx.Request.RequestURI,
		Timestamp: time.Now().Unix(),
	}
	ctx.AbortWithStatusJSON(status, err)
}

// AcceptedWithMsg .
func AcceptedWithMsg(ctx *gin.Context, code int, msg string) {
	if msg == "" {
		msg = "202 ACCEPTED"
	}
	var err = &ErrorResp{
		Status:    http.StatusAccepted,
		Code:      code,
		RequestID: requestid.Get(ctx),
		Message:   msg,
		Path:      ctx.Request.RequestURI,
		Timestamp: time.Now().Unix(),
	}
	ctx.AbortWithStatusJSON(http.StatusAccepted, err)
}

// ConflictWithMsg .
func ConflictWithMsg(ctx *gin.Context, code int, msg string) {
	if msg == "" {
		msg = "409 CONFLICT"
	}
	var err = &ErrorResp{
		Status:    http.StatusConflict,
		Code:      code,
		RequestID: requestid.Get(ctx),
		Message:   msg,
		Path:      ctx.Request.RequestURI,
		Timestamp: time.Now().Unix(),
	}
	ctx.AbortWithStatusJSON(http.StatusConflict, err)
}
