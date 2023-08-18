import { Request } from "express";
import { Show } from "../resources/show";
import { Route } from "../rest/route";
import { SearchParams } from "../rest/search-params";
import { SearchResults } from "../rest/search-results";
import { Pool } from "pg";
import { HalLink, HalResource } from "hal-types";
import sql from '@sequencework/sql';
import { join } from "./routes";

interface ShowData {
    show_id: number;
    title: string;
    num_seasons: number;
    start_year: number; 
}

interface TotalRowsData {
    total_rows: number;
}

export class ShowsRoute implements Route<Show> {
    constructor(private baseUrl: string, private pool: Pool) {}

    async list(req: Request, params: SearchParams): Promise<SearchResults<HalResource<Show>>> {
        // TODO: limit & offset input parameters are more likely useful for a DB-centric service
        const offset = (params.page - 1) * params.perPage;
        const q = `
SELECT
    show_id,
    title,
    num_seasons,
    start_year
FROM
    shows
ORDER BY
    show_id ASC
LIMIT ${params.perPage} OFFSET ${offset}
`;
        const result = await this.pool.query<ShowData>(q);
        const items = result.rows.map(data => {
            return {
                id: data.show_id,
                title: data.title,
                numSeasons: data.num_seasons,
                startYear: data.start_year,
                _links: {
                    self: this.getSelfLink(data.show_id),
                },
            };
        });

        const r2 = await this.pool.query<TotalRowsData>('SELECT COUNT(*) as total_rows FROM shows'); // TODO: make sure any search/filter params get copied down
        const totalRows = r2.rows && r2.rows[0] && r2.rows[0].total_rows || 0;
        return {
            items,
            numPages: Math.ceil(totalRows / params.perPage), // TODO: prefer to re-use calculation logic up a level 
            page: params.page,
            perPage: params.perPage,
        }
    }

    async lookup(id: string): Promise<HalResource<Show> | undefined> {
        const showId = parseInt(id, 10);
        const stmt = sql`
    SELECT
        show_id,
        title,
        num_seasons,
        start_year
    FROM
        shows
    WHERE show_id = ${showId}
`;
        const result = await this.pool.query<ShowData>(stmt);
        const firstItem = result.rows.length && result.rows[0];
        if (firstItem) {
            return {
                id: firstItem.show_id,
                title: firstItem.title,
                numSeasons: firstItem.num_seasons,
                startYear: firstItem.start_year,
                _links: {
                    self: this.getSelfLink(showId),
                },
            };
        }
        return undefined;
    }

    async create(partial: Partial<Show>): Promise<HalLink> {
        if (!partial) {
            throw new Error('no data provided');
        }
        if (!partial.title) {
            throw new Error('empty .title');
        }
        if (!partial.startYear) {
            throw new Error('empty .title');
        }
        // OK: .numSeasons might be zero/misssing if a show hasn't started yet (perhaps)
        // TODO: ... could validate that assumption, though ;)

        const stmt = sql`
INSERT INTO shows (title, num_seasons, start_year)
VALUES
(${partial.title}, ${partial.numSeasons}, ${partial.startYear})
RETURNING show_id
`
        const result = await this.pool.query<Partial<ShowData>>(stmt);
        if (result.rows.length && result.rows[0].show_id) {
            const newId = result.rows[0].show_id; // Note: PostgreSQL allows `RETURN show_id AS showId` syntax, but "showId" is returned lowercased ("showid") :|
            return this.getSelfLink(newId);
        } else {
            throw new Error('no rows inserted');
        }
    }
    
    private getSelfLink(id: number): HalLink {
        return { href: join(this.baseUrl, String(id)) };
    }
}
