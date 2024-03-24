ifneq ("$(wildcard .env)","")
	include .env
endif

.PHONY: run setup setup-env setup-db

setup: setup-env setup-db

setup-env:
	./bin/gen-env.sh

setup-db:
	./bin/setup-db.sh

run:
	ENV=local \
	APP_PORT=8030 \
	go run .
