import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import { API_HOST, API_ROOT } from '../../../config';

describe(`GET /v1/shows/:id`, () => {
    test('should link to itself', async () => {
        const req = request(API_HOST);
        let res = await req.get(`${API_ROOT}/shows`).expect(200);
        const firstItem = res.body.items[0];
        const itemUrl = firstItem._links.self.href;

        res = await req.get(itemUrl).expect(200);
        expect(res.body).toHaveProperty('_links.self.href', itemUrl);
        expect(res.body).toMatchObject(firstItem); // TODO: roughly, right?? (this might include additional nested resources/links)
    });
});
