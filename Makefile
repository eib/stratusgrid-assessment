.DEFAULT_GOAL := test up probe
IMAGE_ROOT := stratusgrid-assessment
DOCKER_IP_QUERY := docker inspect -f '{{range .NetworkSettings.Networks}}{{println .IPAddress}}{{end}}'
DB_CONTAINER_QUERY := docker container ls --all --filter=ancestor=${IMAGE_ROOT}-db --format "{{.ID}}"
API_CONTAINER_QUERY := docker container ls --all --filter=ancestor=${IMAGE_ROOT}-api --format "{{.ID}}"
DB_CREDS := eblackwelder:assessment
DB_SCHEMA := stratusgrid

todo:
	echo TODO: extract image-specific stuff to their own Makefiles??
	echo TODO: postgres `run -it` w/ localhost:5432 doesn't seem to work... so, what to use? :thinking:
	echo TODO: lock down DB password (.pgpass, IIRC??)

api-sh:
	docker exec -it `${API_CONTAINER_QUERY}` bash
api-ip:
	@echo $(shell $(DOCKER_IP_QUERY) `$(API_CONTAINER_QUERY)`)
api-watch:
	@cd api; DB_URL=postgresql://${DB_CREDS}@localhost:5432/${DB_SCHEMA} npm run dev-server

db-sh:
	docker exec -it `${DB_CONTAINER_QUERY}` bash
db-ip:
	@echo $(shell $(DOCKER_IP_QUERY) `$(DB_CONTAINER_QUERY)`)
db-url:
	@echo postgresql://${DB_CREDS}@$(shell $(DOCKER_IP_QUERY) `$(DB_CONTAINER_QUERY)`):5432/${DB_SCHEMA}
psql:
	docker exec -it `${DB_CONTAINER_QUERY}` psql postgresql://${DB_CREDS}@localhost:5432/${DB_SCHEMA}

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
	cd api; npm run test

probers: db-probers api-probers
db-probers:
	docker exec `${DB_CONTAINER_QUERY}` bin/run_probes.sh
api-probers:
	cd probers; npm run test

.PHONY: todo \
 	api-sh api-ip api-watch \
	db-sh db-ip psql \
	dev prod logs down \
	test api-test \
	probers db-probers api-probers
