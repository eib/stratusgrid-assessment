# Database Schema

## How to use this folder
Currently, the files in `./schema/` scripts are run on start-up in order (alphabetically) -- but if there is an empty database.

Note: `docker-compose up` does *NOT* refresh data, but `docker-compose restart` does.

To 
* Add `{schema|data|test|etc}.sql` files to `./schema/` folder:
    * `schema.sql` files for table, column, etc
    * `data.sql` files for importing data
    * `test.sql` files for unit-tests / probes
Note 1: prefix files with numbers to have them sorted (alphabetically).

Note: The default/application database name is implicit/implied. Don't specify it.

## Testing / Probing
All files matching `schema/*test.sql` can be executed via the `./run_probes.sh` script (which must be executed inside the DB Docker container). Try `make probe` to perform the probe from the Docker host.

### Test examples
To "test" the existence of specific schema items (such as a table), try something like this:
```
SELECT 1/(SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'XXX' LIMIT 1)
AS XXX_table_exists;
```

To "test" the existence of specific data (such as initial/imported data), try something like this:
```
SELECT 1/(SELECT 1 FROM XXX WHERE ??? LIMIT 1)
AS XXX_data_exists;
```

## TODOs
Short-term:
* Tooling to perform schema upgrades post-startup.
* Patterns for idempotent schema changes.

Long-term arch goals:
* Prefer "semantically-versioned" schema changes for major/minor releases.
* Also want per-feature/branch schema changes OK for development/CI releases.
* Outline schema upgrade, downgrade, test processes & patterns
* Tooling needs:
    * perform upgrades
    * perform downgrades
    * run schema & data tests
    * log version-change metadata (in the DB)
* Break down upgrades into table/column/constraint/etc files (to be more easily ordered)
