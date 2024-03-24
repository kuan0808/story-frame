package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kuan0808/story-frame/backend/pkg/model"
	ssrv "github.com/kuan0808/story-frame/backend/pkg/service/sentence"
)

// CreateSentence handles the creation of new sentences with JSON content.
func CreateSentence(c *gin.Context) {
	var newSentence struct {
		Content  interface{} `json:"content"`
		Cast     interface{} `json:"cast"`
		User     interface{} `json:"user"`
		ParentID *uint       `json:"parent_id"`
	}
	if err := c.ShouldBindJSON(&newSentence); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Prepare the sentence for database insertion
	sentence := model.Sentence{
		Content:  model.JSONContent{Data: newSentence.Content},
		Cast:     model.JSONContent{Data: newSentence.Cast},
		User:     model.JSONContent{Data: newSentence.User},
		ParentID: newSentence.ParentID,
	}

	// Assuming CreateSentence returns the created sentence and the path (array of sentences to root)
	createdSentence, path, err := ssrv.CreateSentence(&sentence)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create sentence"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"verse_id": createdSentence.ID,
		"contents": path, // Convert path (slice of sentences) to a suitable JSON structure
	})
}

// GetParent fetches the parent of a given sentence and its details.
func GetParent(c *gin.Context) {
	verseID := c.Param("verse_id")

	id, err := strconv.ParseUint(verseID, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid verse ID"})
		return
	}

	parent, err := ssrv.GetParent(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch parent"})
		return
	}

	if parent == nil {
		c.JSON(http.StatusOK, gin.H{"contents": []interface{}{}, "parent_cast": nil, "parent_id": nil})
		return
	}

	// Assuming GetContents returns the contents array from root to the parent
	contents, err := ssrv.GetPath(parent.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch contents"})
		return
	}

	response := gin.H{
		"contents": contents,
	}

	if parent.ParentID != nil {
		response["parent_id"] = parent.ParentID
		response["parent_cast"] = parent.Cast
	}

	c.JSON(http.StatusOK, response)
}

// GetPathAndSiblings fetches the path from the root to the given sentence, and its siblings.
func GetPathAndSiblings(c *gin.Context) {
	verseID := c.Param("verse_id")

	id, err := strconv.ParseUint(verseID, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid verse ID"})
		return
	}

	// Get the path from the root to the current sentence
	path, err := ssrv.GetPath(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch path"})
		return
	}

	// Assuming GetSiblings returns the IDs of all sibling sentences
	siblingIDs, err := ssrv.GetSiblings(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch siblings"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"contents":    path,
		"sibling_ids": siblingIDs,
	})
}
