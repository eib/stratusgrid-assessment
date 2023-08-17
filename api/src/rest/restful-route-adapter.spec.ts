import { describe, expect, test } from "@jest/globals";
import './restful-route-adapter';
import request from 'supertest';
import { baseUrl, buildAppWithMockPool } from "../routes/test-helpers";
import { anything, when } from "ts-mockito";
import { Show } from "../resources/show";

describe("GET /:resource", () => {
    test("should return 500 when uncaught error occurs", async () => {
        const app = buildAppWithMockPool(pool => {
            when(pool.query<Show>(anything()))
                .thenReject(new Error('you shall not parse'));
        });
        const res = await request(app).get(`${baseUrl}/shows`);
        expect(res.status).toBe(500);
    });
});

describe("GET /:resource/:id", () => {
    test("should return 500 when uncaught error occurs", async () => {
        const app = buildAppWithMockPool(pool => {
            when(pool.query<Show>(anything()))
                .thenReject(new Error('you shall not parse'));
        });
        const res = await request(app).get(`${baseUrl}/shows/13`);
        expect(res.status).toBe(500);
    });
});
