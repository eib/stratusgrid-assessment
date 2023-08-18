import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import { API_HOST, API_ROOT } from '../../config';

/**
 * REST-ful workflow exercising the Shows APIs
 */
describe(`Shows collection`, () => {
    test('fetching an item', async () => {
        const req = request(API_HOST);

        // GET .../
        let res = await req.get('/').expect(200);
        const showsRoot = res.body.shows.href;

        // GET .../shows
        res = await req.get(showsRoot).expect(200);
        const firstItem = res.body.items[0];
        const itemUrl = firstItem._links.self.href;

        // GET .../shows/:id
        res = await req.get(itemUrl).expect(200);
        expect(res.body).toHaveProperty('_links.self.href', itemUrl);
        expect(res.body).toMatchObject(firstItem); // TODO: roughly, right?? (this might include additional nested resources/links)
    });
});
