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

## DB Structure
### MVP
* Shows
    * show_id (PK, auto-increment)
    * title
    * num_seasons
    * start_year
### Nice-to-haves
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

### 
* DB type
    * Relational, for the relational integrity as the feature list grows (categories, seasons, actors, etc)
* DB system
    * PostgreSQL, because it doesn't really matter which SQL database
* Schema conventions:
    * Naming: `table_names`, `column_name`, `primary_id` (vs `id`) ... based on previous conventions
* Schema versioning:
    * In the short-term, files in `./schema/` are numerically-prefixed
    * Long-term, I would like tooling to create, import, update, rollback, and test schema changes


## Verification steps
* make up
* make probe
* make down
* make up-prod
* make probe
