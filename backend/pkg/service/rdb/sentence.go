package rdb

import (
	"errors"

	"github.com/kuan0808/story-frame/backend/pkg/model"
	"gorm.io/gorm"
)

// CreateSentence creates a new sentence with JSON content.
func CreateSentence(sentence *model.Sentence) error {
	// Store the sentence in the database
	if err := Get().Create(sentence).Error; err != nil {
		return err
	}

	return nil
}

// GetPathToRoot retrieves the path from the given sentence ID to the root.
func GetPathToRoot(sentenceID uint) ([]model.Sentence, error) {
	var path []model.Sentence

	// Recursive CTE query in MySQL syntax
	cteQuery := `
WITH RECURSIVE sentence_path AS (
    SELECT id, content, cast, user, parent_id, created_at
    FROM sentences
    WHERE id = ?
    UNION ALL
    SELECT s.id, s.content, s.cast, s.user, s.parent_id, s.created_at
    FROM sentences s
    INNER JOIN sentence_path sp ON s.id = sp.parent_id
)
SELECT * FROM sentence_path;
`
	// Execute the CTE query with GORM
	result := Get().Raw(cteQuery, sentenceID).Scan(&path)
	if result.Error != nil {
		return nil, result.Error
	}

	return path, nil
}

// GetSentence fetches a sentence by its ID.
func GetSentence(verseID uint) (*model.Sentence, error) {
	var sentence model.Sentence

	// Fetch the sentence by its ID
	err := Get().First(&sentence, verseID).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &sentence, nil
}

// GetSiblings fetches the siblings of a given sentence.
func GetSiblings(verseID uint) ([]model.Sentence, error) {
	var siblings []model.Sentence

	// Fetch the siblings of the given sentence
	result := Get().Where("parent_id = ?", verseID).Find(&siblings)
	if result.Error != nil {
		return nil, result.Error
	}

	return siblings, nil
}
