package model

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"
)

const TableNameSentence = "sentences"

// JSONContent allows for easy JSON storage and retrieval of the Content field.
type JSONContent struct {
	Data interface{}
}

// Value implements the driver.Valuer interface, allowing for database storage.
func (j JSONContent) Value() (driver.Value, error) {
	return json.Marshal(j.Data)
}

// Scan implements the sql.Scanner interface, allowing for database retrieval.
func (j *JSONContent) Scan(src interface{}) error {
	bytes, ok := src.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}
	return json.Unmarshal(bytes, &j.Data)
}

type Sentence struct {
	ID        uint        `gorm:"primaryKey" json:"id"`
	Content   JSONContent `json:"content"` // Use JSONContent for automatic JSON (de)serialization
	Cast      JSONContent `json:"cast"`
	User      JSONContent `json:"user"`
	ParentID  *uint       `json:"parent_id,omitempty"`
	CreatedAt time.Time   `gorm:"column:created_at;type:timestamp;not null;default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time   `gorm:"column:updated_at;type:timestamp;not null;default:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" json:"updated_at"`
	DeleteAt  *time.Time  `gorm:"column:deleted_at;type:timestamp" json:"deleted_at"`
}

func (s *Sentence) TableName() string {
	return TableNameSentence
}
