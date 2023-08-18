import { describe, expect, test } from "@jest/globals";
import request from 'supertest';
import { anything, when } from 'ts-mockito';
import { Show } from "../resources/show";
import { baseUrl, buildAppWithMockPool, buildQueryResult } from './test-helpers';

describe("GET shows/", () => {
    test("should return a list of items", async () => {
        const rows = [
            {
                id: 1, title: "foo", numSeasons: 1, startYear: 1776,
            },
            {
                id: 2, title: "bar", numSeasons: 2, startYear: 1980,
            },
            {
                id: 3, title: "batz", numSeasons: 10, startYear: 2023,
            },
        ];
        const app = buildAppWithMockPool((pool) => {
            when(pool.query<Show>(anything())) // Note: prepared statements (if used) aren't `anyString()`s
                .thenResolve(buildQueryResult(rows));
        });

        const res = await request(app).get(`${baseUrl}/shows`);
        
        expect(res.status).toBe(200);
        expect(res.body.page).toBe(1);
        expect(res.body.perPage).toBeGreaterThanOrEqual(rows.length);
        expect(res.body.items).toMatchObject(rows);
        for (let ii = 0; ii < rows.length; ii++) {
            expect(res.body.items[ii]).toMatchObject(rows[ii]);
            expect(res.body.items[ii]).toHaveProperty('_links.self.href', `${baseUrl}/shows/${rows[ii].id}`);
        }
    });
});

describe("GET shows/:id", () => {
    test("should return a single item if it exists", async () => {
        const item = {
            id: 13, title: "OnePiece", numSeasons: 9000, startYear: 1923,
        };
        const app = buildAppWithMockPool((pool) => {
            when(pool.query<Show>(anything())) // Note: prepared statements (if used) aren't `anyString()`s
                .thenResolve(buildQueryResult([ item ]));
        });

        const res = await request(app).get(`${baseUrl}/shows/13`);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(item);
        expect(res.body).toHaveProperty('_links.self.href', `${baseUrl}/shows/13`);
    });

    test("should return 404 if it does not exist", async () => {
        const app = buildAppWithMockPool((pool) => {
            when(pool.query<Show>(anything())) // Note: prepared statements (if used) aren't `anyString()`s
                .thenResolve(buildQueryResult([]));
        });

        const res = await request(app).get(`${baseUrl}/shows/13`);

        expect(res.status).toBe(404);
    });
});

describe("POST shows", () => {
    interface ShowInsertQueryResult {
        show_id: number
    }

    test("should return a HREF to the newly created item ", async () => {
        const app = buildAppWithMockPool((pool) => {
            when(pool.query<ShowInsertQueryResult>(anything())) // Note: prepared statements (if used) aren't `anyString()`s
                .thenResolve(buildQueryResult([ { show_id: 1234 } ]));
        });
        const item = {
            title: "OnePiece", numSeasons: 9000, startYear: 1923,
        };
        const res = await request(app).post(`${baseUrl}/shows`).send(item).set('Accept', 'application/json');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('href', `${baseUrl}/shows/1234`);
    });
    test("should return 500 if no data provided", async () => {
        const app = buildAppWithMockPool((pool) => {
            when(pool.query<ShowInsertQueryResult>(anything())) // Note: prepared statements (if used) aren't `anyString()`s
                .thenResolve(buildQueryResult([ { show_id: 1234 } ]));
        });
        const res = await request(app).post(`${baseUrl}/shows`).send(undefined).set('Accept', 'application/json');

        expect(res.status).toBe(500);
    });
    test("should return 500 if unparseable data provided", async () => {
        const app = buildAppWithMockPool((pool) => {
            when(pool.query<ShowInsertQueryResult>(anything())) // Note: prepared statements (if used) aren't `anyString()`s
                .thenResolve(buildQueryResult([ { show_id: 1234 } ]));
        });
        const res = await request(app).post(`${baseUrl}/shows`).send('foobarbatzquux').set('Accept', 'application/json');

        expect(res.status).toBe(500);
    });
    test("should return 500 if no startYear provided", async () => {
        const app = buildAppWithMockPool((pool) => {
            when(pool.query<ShowInsertQueryResult>(anything())) // Note: prepared statements (if used) aren't `anyString()`s
                .thenResolve(buildQueryResult([ { show_id: 1234 } ]));
        });
        const item = {
            title: "OnePiece",
            numSeasons: 9000,
            // startYear: 1923,
        };
        const res = await request(app).post(`${baseUrl}/shows`).send(item).set('Accept', 'application/json');

        expect(res.status).toBe(500);
    });
    test("should return 500 if no title provided", async () => {
        const app = buildAppWithMockPool((pool) => {
            when(pool.query<ShowInsertQueryResult>(anything())) // Note: prepared statements (if used) aren't `anyString()`s
                .thenResolve(buildQueryResult([ { show_id: 1234 } ]));
        });
        const item = {
            // title: "OnePiece",
            numSeasons: 9000,
            startYear: 1923,
        };
        const res = await request(app).post(`${baseUrl}/shows`).send(item).set('Accept', 'application/json');

        expect(res.status).toBe(500);
    });
    test("should return 500 if no show ID returned by DB", async () => {
        const app = buildAppWithMockPool((pool) => {
            when(pool.query<ShowInsertQueryResult>(anything())) // Note: prepared statements (if used) aren't `anyString()`s
                .thenResolve(buildQueryResult([]));
        });
        const item = {
            title: "OnePiece", numSeasons: 9000, startYear: 1923,
        };
        const res = await request(app).post(`${baseUrl}/shows`).send(item).set('Accept', 'application/json');

        expect(res.status).toBe(500);
    });
});
