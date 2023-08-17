import { describe, expect, test } from "@jest/globals";
import { buildApp } from "./routes";
import request from 'supertest';

describe('GET /unknown-url', () => {
    test("should return 404", async () => {
        const app = buildApp();
        const res = await request(app).get('/unknown-url');
        expect(res.status).toBe(404);
    });
});
