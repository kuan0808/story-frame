#!/bin/sh

if [ "$( docker container inspect -f '{{.State.Running}}' mysql8-frame 2>/dev/null )" != "true" ]; then
		docker pull mysql:8.0
		docker run --name mysql8-frame \
			--restart unless-stopped \
			-e MYSQL_ROOT_PASSWORD="$MYSQL_PASSWORD" -e MYSQL_DATABASE=frame \
			-v mysql8-data-frame:/var/lib/mysql \
			-p "$MYSQL_PORT":3306 \
      --health-cmd='mysqladmin ping --silent' \
			-d \
			mysql:8.0
fi
