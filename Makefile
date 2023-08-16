.DEFAULT_GOAL := up test

db:
	docker exec -it \
	`docker container ls --all --filter=ancestor=stratusgrid-assessment-db --format "{{.ID}}"` \
	bash

psql:
	@# echo TODO: localhost:5432 doesn't seem to work... so, what to use? :thinking:
	@# echo TODO: lock down password (.pgpass, IIRC)
	docker exec -it \
	`docker container ls --all --filter=ancestor=stratusgrid-assessment-db --format "{{.ID}}"` \
	psql postgresql://eblackwelder:assessment@/stratusgrid

up:
	docker-compose up --detach

down:
	docker-compose down

restart:
	docker-compose restart

test: db_test

db_test:
	docker exec -it \
	`docker container ls --all --filter=ancestor=stratusgrid-assessment-db --format "{{.ID}}"` \
	bin/run-tests.sh

.PHONY: db psql \
	up down restart \
	test db_test
