package rdb

import (
	"fmt"
	"log"
	"os"
	"sync"
	"time"

	"github.com/kuan0808/story-frame/backend/pkg/config"
	kglog "github.com/kuan0808/story-frame/backend/pkg/log"
	"github.com/kuan0808/story-frame/backend/pkg/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var database *gorm.DB
var initdatabaseOnce sync.Once

// Get database
func Get() *gorm.DB {
	initdatabaseOnce.Do(initialize)
	return database
}

// Init database
func Init() {
	initdatabaseOnce.Do(initialize)
}

// initialize will create a new database sesssion. If we are in an CI environment, a random table name will be used.
func initialize() {
	var err error
	username := config.GetString("MYSQL_USERNAME")
	password := config.GetString("MYSQL_PASSWORD")
	host := config.GetString("MYSQL_HOST")
	port := config.GetString("MYSQL_PORT")
	options := config.GetString("MYSQL_OPTIONS")
	databaseName := config.GetString("MYSQL_DATABASE")
	slowThreshold := time.Duration(config.GetInt("MYSQL_SLOW_THRESHOLD")) * time.Millisecond
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?%s", username, password, host, port, databaseName, options)

	database, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.New(
			log.New(os.Stdout, "\r\n", log.LstdFlags),
			logger.Config{
				SlowThreshold:             slowThreshold,
				LogLevel:                  logger.Warn,
				IgnoreRecordNotFoundError: true,
				Colorful:                  true,
			},
		),
	})
	if err != nil {
		kglog.Fatalf("failed to connect database: %v", err)
	}
	if err := create(); err != nil {
		kglog.Fatalf("failed to create tables: %v", err)
	}
}

func tables() []interface{} {
	return []interface{}{
		&model.Sentence{},
	}
}

func create() error {
	// Create tables.
	if err := database.AutoMigrate(tables()...); err != nil {
		return err
	}
	return nil
}
