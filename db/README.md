# Database Schema

Note: `docker-compose up` does *NOT* refresh data, but `docker-compose restart` does.

## How to use this folder
Currently:
* Add `{schema|data|test|etc}.sql` files to `./schema/` folder:
    * `schema.sql` files for table, column, etc
    * `data.sql` files for importing data
    * `test.sql` files for "unit-tests"
Note 1: prefix files with numbers to have them sorted (alphabetically).

Note: The default/application database name is implicit/implied. Don't specify it.

## TODO
* Prefer "semantically-versioned" schema changes for major/minor releases.
* Also want per-feature/branch schema changes OK for development/CI releases.
* Outline schema upgrade, downgrade, test processes & patterns
* Tooling needs:
    * perform upgrades
    * perform downgrades
    * run schema & data tests
    * log version-change metadata (in the DB)
* Break down upgrades into table/column/constraint/etc files (to be more easily ordered)
