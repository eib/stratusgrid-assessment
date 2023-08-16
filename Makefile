.DEFAULT_GOAL := test up probe
IMAGE_ROOT := stratusgrid-assessment

todo:
	echo TODO: extract image-specific stuff to their own Makefiles
	echo TODO: postgres `run -it` w/ localhost:5432 doesn't seem to work... so, what to use? :thinking:
	echo TODO: lock down DB password (.pgpass, IIRC??)

api:
	docker exec -it \
	`docker container ls --all --filter=ancestor=${IMAGE_ROOT}-api --format "{{.ID}}"` \
	bash
db:
	docker exec -it \
	`docker container ls --all --filter=ancestor=${IMAGE_ROOT}-db --format "{{.ID}}"` \
	bash
psql:
	docker exec -it \
	`docker container ls --all --filter=ancestor=${IMAGE_ROOT}-db --format "{{.ID}}"` \
	psql postgresql://eblackwelder:assessment@/stratusgrid

dev:
	docker-compose up --build --detach
prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build --detach
logs:
	docker-compose logs -f
down:
	docker-compose down

test: api-test
api-test:
	cd api; make test

probe: db_probe
db_probe:
	docker exec -it \
	`docker container ls --all --filter=ancestor=stratusgrid-assessment-db --format "{{.ID}}"` \
	bin/run_probes.sh

.PHONY: todo \
 	api db psql \
	dev prod logs down \
	test api-test \
	probe db_probe
