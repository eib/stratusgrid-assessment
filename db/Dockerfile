# syntax=docker/dockerfile:1
FROM postgres:latest

# TODO: lock-down secrets (extract to Docker var file)
ENV POSTGRES_DB=stratusgrid
ENV POSTGRES_USER=eblackwelder
ENV POSTGRES_PASSWORD=assessment
EXPOSE 5432

# Built-in initialization scripts, per https://hub.docker.com/_/postgres/ 
COPY ./schema /docker-entrypoint-initdb.d/
COPY --chmod=u+x run_probes.sh /bin/
