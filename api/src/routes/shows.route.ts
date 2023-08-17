import { Request } from "express";
import { Show } from "../resources/show";
import { Route } from "../rest/route";
import { SearchParams } from "../rest/search-params";
import { SearchResults } from "../rest/search-results";
import { Pool } from "pg";
import sql from '@sequencework/sql';

export class ShowsRoute implements Route<Show> {
    constructor(private pool: Pool) {}

    async lookup(id: string): Promise<Show | undefined> {
        const showId = parseInt(id, 10);
        const stmt = sql`
    SELECT
        show_id AS id,
        title,
        num_seasons AS numSeasons,
        start_year AS startYear
    FROM
        shows
    WHERE show_id = ${id}
`;
        const result = await this.pool.query(stmt);
        return result.rows.length && result.rows[0] || undefined;
    }

    async list(req: Request, params: SearchParams): Promise<SearchResults<Show>> {
        // TODO: limit & offset input parameters are more likely useful for a DB-centric service
        const offset = (params.page - 1) * params.perPage;
        const q = `
SELECT
    (SELECT COUNT(*) FROM shows) AS totalRows,
    show_id AS id,
    title,
    num_seasons AS numSeasons,
    start_year AS startYear
FROM
    shows
ORDER BY
    show_id ASC
LIMIT ${params.perPage} OFFSET ${offset}
`;
        const result = await this.pool.query(q);
        const items = result.rows.map(({id, title, numSeasons, startYear}) => {
            return { id, title, numSeasons, startYear };
        });
        // TODO: separate query (w/ same search/filter params)
        const totalRows = result.rows && result.rows[0] && result.rows[0].totalRows || 0;
        return {
            items,
            numPages: Math.ceil(totalRows / params.perPage), // TODO: prefer to re-use calculation logic up a level 
            page: params.page,
            perPage: params.perPage,
        }
    }
}
