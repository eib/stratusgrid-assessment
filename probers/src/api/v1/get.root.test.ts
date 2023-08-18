import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import { API_HOST, API_ROOT } from '../../config';

describe('GET /v1', ()  => {
    test('should include link to shows collection', async () => {
        const req = request(API_HOST);
        const res = await req.get(API_ROOT).expect(200);
        expect(res.body).toHaveProperty('shows.href', `${API_ROOT}/shows`);
    });
});
