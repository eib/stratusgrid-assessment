# Backend API server

## Conventions
Refer to the Richardson Maturity Model (for REST-ful APIs):
    https://blog.restcase.com/4-maturity-levels-of-rest-api-design/
    https://martinfowler.com/articles/richardsonMaturityModel.html

### REST-like Conventions
* `GET /:resources/` => 200: collection of the Resource
* `GET /:resources/:id` => 200: if found, JSON content of the Resource; otherwise 404
* `POST /:resources/` => 201: URL of newly created Resource
* `PUT /:resources/:id` => 204: if found, Resource updated successfully; otherwise 404
* `PATCH /:resources/:id` => 204: if found, Resource was (partially) updated; otherwise 404
* `DELETE /:resources/:id` => 200: if found, Resource was deleted; otherwise 404
* Support for content negotiation, but basically only JSON accepted at the present

### REST-ful Conventions
* `GET /` => 200: collection of all resource endpoints (JSON)
* Resources contain links to related/nested Resources
    * `.links.*` => canonical (absolute) URLs to related resources
    * `.links.self` => canonical (absolute) URL to self
* Search results:
    * `.links.first`
    * `.links.prev`
    * `.links.next`
    * `.links.last`

### Misc
* No Verbs in URLs (/addX, deleteX)
* Resources *may* contain links to actions
* Resource collections (and search/filter results) include pagination metadata
* Standard query parameters:
    * `page` (vs `offset`, `start`) and `per_page` (vs `end`, `[batch]size`), because it's what GitHub is using ATM:
        https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28
* URL segments are all lower-hyphen-case
* Resource URL segments are pluralized
* JSON Content naming patterns follows JavaScript best-practices/MDN conventions (esp. lowerCaseId)
    * See also: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
