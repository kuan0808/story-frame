package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kuan0808/story-frame/backend/api"
	"github.com/kuan0808/story-frame/backend/middleware"
	"github.com/kuan0808/story-frame/backend/pkg/config"
	"github.com/kuan0808/story-frame/backend/pkg/log"
	"github.com/kuan0808/story-frame/backend/pkg/service/rdb"
)

func main() {
	rdb.Init()

	// setup gin
	appPort := config.GetString("APP_PORT")
	r := gin.New()
	r.Use(
		middleware.HandlePanic,
	)

	r.POST("/create", api.CreateSentence)
	r.GET("/:verse_id/back", api.GetParent)
	r.GET("/:verse_id", api.GetPathAndSiblings)

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", appPort),
		Handler: r,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Errorf("listen: %s\n", err)
		}
	}()

	// graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Errorf("Server Shutdown: %v", err)
	}
}
