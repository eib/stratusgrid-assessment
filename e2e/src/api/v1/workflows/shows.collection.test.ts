import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import { API_HOST, API_ROOT } from '../../../config';

/**
 * REST-ful workflow exercising the Shows APIs
 */
describe(`Shows collection`, () => {
    test('fetching an item', async () => {
        const req = request(API_HOST);

        // GET .../
        let res = await req.get(API_ROOT).expect(200);
        const showsRoot = res.body.shows.href as string;

        // GET .../shows
        res = await req.get(showsRoot).expect(200);
        const firstItem = res.body.items[0];
        const itemUrl = firstItem._links.self.href;

        // GET .../shows/:id
        res = await req.get(itemUrl).expect(200);
        expect(res.body).toHaveProperty('_links.self.href', itemUrl);
        expect(res.body).toMatchObject(firstItem); // TODO: roughly, right?? (this might include additional nested resources/links)

        // POST .../shows
        const partial = {
            title: `test-${createInsecureGUID()}`,
            numSeasons: getRandomInt(100),
            startYear: 1970 + getRandomInt(1000),
        };
        console.log('Sending body: ');
        console.log(partial);
        res = await req.post(showsRoot)
            .send(partial)
            .set('Accept', 'application/json')
            .expect(200);
        
        expect(res.body).toHaveProperty('href');
        expect(res.body.href).toBeTruthy();

        // TODO: DELETE (the new record)
    });
});

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function createInsecureGUID() {
    // from https://stackoverflow.com/a/21963136
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}