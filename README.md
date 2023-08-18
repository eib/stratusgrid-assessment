# stratusgrid-assessment
StratusGrid engineering code assessment

## Site Features
### MVP
* List of anime shows
* Add/edit shows/list
### Nice-to-have
* User Login
* Feature: end-users can favorite shows/mark watched
* Role-based UI: Only admins can edit show(s)/listing(s)

## API

### MVP
* Resources:
    * `/shows` => Collection of Shows { title, numSeasons, startYear }

### Nice-to-haves
* Authorization (for POST/PUT/DELETE)
* Resources:
    * Users
    * User favorites
* Search functionality
* Plaintext `GET` responses would be useful for humans
* Handle `HEAD` requests
* Handle `OPTIONS` requests ... esp. the dreaded CORS :|

## DB Structure
### MVP
* Shows
    * show_id (PK, auto-increment)
    * title
    * num_seasons
    * start_year
### Nice-to-haves
* Auto-updating creation/modification timestamps (helps with HTTP caching)
* Users
    * user_id (PK, auto-increment)
    * username (unique constraint)
    * email_address (unique constraint)
* UserFavorites
    * user_favorite_id (PK, auto-increment)
        * ... vs PK on {user_id, show_id} (cascading delete) ??
    * user_id
    * show_id
* Roles
    * role_id (PK, auto-increment)
    * role_name (unique constraint)
    * is_admin
* UserRoles
    * user_role_id (PK, auto-increment)
        * ... vs PK on {user_id, role_id} (cascading delete) ??
    * user_id
    * role_id


## Decisions
* Number of Repositories
    * Mono repo, for the sake of author/reviewer simplicity 
* Subject matter
    * Anime! ... cuz reasonz :P

### API/backend decisions
* Language: Typescript, due to personal preference
* HTTP server/middleware "framework": express (for now), due to starting simplicity (prefer async style of Koa, but whatevs)
* Testing tools: Jest, because I haven't tried it yet (vs Mocha, Jasmine, etc)
* Going RESTful: for the sake of URL decoupling (vs REST-like), for the sake of service simplicity (vs GraphQL)
* API-versioning: URL-based API versioning (e.g. `api.whatever.com/vX/...`) vs custom/Accept header for the sake of human-browsing/discoverability
    * Definitely willing to reconsider this (again). Left off reading at: https://blog.restcase.com/restful-api-versioning-insights/

### DB decisions
* DB type
    * Relational, for the relational integrity as the feature list grows (categories, seasons, actors, etc)
* DB system
    * PostgreSQL, because it doesn't really matter which SQL database
* Schema conventions:
    * Naming: `table_names`, `column_name`, `primary_id` (vs `id`) ... based on previous conventions
* Schema versioning:
    * In the short-term, files in `./schema/` are numerically-prefixed
    * Long-term, I would like tooling to create, import, update, rollback, and test schema changes


## Make targets
Various important `make` targets:
* `make dev` - starts services in (detached) dev mode
* `make logs` - (continually) shows service logs
* `make prod` - starts prod services
* `make e2e` - runs e2e tests (probers, workflows, etc)
* `make test` - runs local unit-tests
* `make psql` - connects to DB service (if up)
