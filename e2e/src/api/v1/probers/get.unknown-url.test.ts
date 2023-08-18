import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import { API_HOST } from '../../../config';

describe('GET /unknown-url', ()  => {
    test('should return 404', async () => {
        const req = request(API_HOST);
        const res = await req.get('/unknown-url').expect(404);
    });
});
