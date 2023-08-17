import {describe, expect, test} from '@jest/globals';
import * as request from 'supertest';
import { API_URL } from './config';

describe('/', ()  => {
    test('GET', () => {
        expect(1+3).toBe(4);
        // TODO: implement
    });
});
