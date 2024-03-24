package sentence

import (
	"errors"

	"github.com/kuan0808/story-frame/backend/pkg/model"
	"github.com/kuan0808/story-frame/backend/pkg/service/rdb"
)

// CreateSentence creates a new sentence with JSON content.
func CreateSentence(sentence *model.Sentence) (*model.Sentence, []model.Sentence, error) {
	if err := rdb.CreateSentence(sentence); err != nil {
		return nil, nil, err
	}

	path, err := rdb.GetPathToRoot(sentence.ID)
	if err != nil {
		return nil, nil, err
	}

	return sentence, path, nil
}

// GetParent fetches the parent of a given sentence and its details.
func GetParent(verseID uint) (*model.Sentence, error) {
	s, err := rdb.GetSentence(verseID)
	if err != nil {
		return nil, err
	}

	if s == nil {
		return nil, errors.New("verse not found")
	}

	if s.ParentID == nil {
		return nil, nil
	}

	parent, err := rdb.GetSentence(*s.ParentID)
	if err != nil {
		return nil, err
	}

	return parent, nil
}

// GetPath fetches the path from the given sentence ID to the root.
func GetPath(verseID uint) ([]model.Sentence, error) {
	path, err := rdb.GetPathToRoot(verseID)
	if err != nil {
		return nil, err
	}

	return path, nil
}

// GetSiblings fetches the siblings of a given sentence.
func GetSiblings(verseID uint) ([]model.Sentence, error) {
	siblings, err := rdb.GetSiblings(verseID)
	if err != nil {
		return nil, err
	}

	return siblings, nil
}

// GetGenesis fetches the root sentence.
func GetGenesis(verseID uint) (*model.Sentence, error) {
	genesis, err := rdb.GetGenesis(verseID)
	if err != nil {
		return nil, err
	}

	return genesis, nil
}
