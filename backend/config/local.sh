#!/bin/sh

# general
export ENV=local
export APP_PORT=8080
export PROJECT_ID=story-frame

# database
export MYSQL_HOST=127.0.0.1
export MYSQL_PORT=3306
export MYSQL_USERNAME=root
export MYSQL_PASSWORD=root
export MYSQL_OPTIONS=charset=utf8mb4\&parseTime=True\&loc=UTC
export MYSQL_DATABASE=frame
export MYSQL_SLOW_THRESHOLD=1000
export MYSQL_DSN="$MYSQL_USERNAME:$MYSQL_PASSWORD@tcp($MYSQL_HOST:$MYSQL_PORT)/$MYSQL_DATABASE?$MYSQL_OPTIONS"
