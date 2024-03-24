package config

import (
	"encoding/json"
	"math/rand"
	"os"
	"strconv"
	"time"
)

func init() {
	rand.New(rand.NewSource(time.Now().UnixNano()))
}

// GetString .
func GetString(key string) string {
	return os.Getenv(key)
}

// GetStringSlice .
func GetStringSlice(key string) []string {
	s := os.Getenv(key)
	res := []string{}
	err := json.Unmarshal([]byte(s), &res)
	if err != nil {
		panic(err)
	}
	return res
}

// GetStringMap .
func GetStringMap(key string) map[string]string {
	s := os.Getenv(key)
	res := map[string]string{}
	err := json.Unmarshal([]byte(s), &res)
	if err != nil {
		panic(err)
	}
	return res
}

// GetInt .
func GetInt(key string) int {
	val, err := strconv.Atoi(os.Getenv(key))
	if err != nil {
		panic(err)
	}
	return val
}

// GetFloat64 .
func GetFloat64(key string) float64 {
	val, err := strconv.ParseFloat(os.Getenv(key), 64)
	if err != nil {
		panic(err)
	}
	return val
}

// GetBool .
func GetBool(key string) bool {
	val, err := strconv.ParseBool(os.Getenv(key))
	if err != nil {
		panic(err)
	}
	return val
}

// GetByUnmarshal .
func GetByUnmarshal(key string, value interface{}) error {
	return json.Unmarshal([]byte(os.Getenv(key)), value)
}
