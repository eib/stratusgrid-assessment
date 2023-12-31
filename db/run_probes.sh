#!/bin/bash

# Runs test SQL files remotely (inside a docker container running the SQL database server)

set -e

cd /docker-entrypoint-initdb.d/
for TEST_FILE in *test.sql; do
    echo Running tests in "$TEST_FILE" ...
    psql postgresql://eblackwelder:assessment@/stratusgrid --file=$TEST_FILE
    echo ... Done.
done
