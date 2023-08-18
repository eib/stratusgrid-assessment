import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import { API_HOST, API_ROOT } from '../../../config';

describe('GET /v1/shows', ()  => {
    test('should be non-empty', async () => {
        const req = request(API_HOST);
        const res = await req.get(`${API_ROOT}/shows`).expect(200);
        expect(res.body.items.length).toBeGreaterThanOrEqual(1);
        expect(res.body).toMatchObject({
            page: 1,
        });
    });
    test('should include hyperlinks', async () => {
        const req = request(API_HOST);
        const res = await req.get(`${API_ROOT}/shows`).expect(200);
        const firstItem = res.body.items[0];
        expect(firstItem).toHaveProperty('_links.self.href', `${API_ROOT}/shows/${firstItem.id}`);
    });
});
