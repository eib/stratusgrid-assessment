import express from 'express';
import { Route } from "./route";
import { SearchParams } from './search-params';

export class RestfulRouteAdapter {
    constructor(private app: express.Application, private urlRoot: string) {}

    buildRoute<T>(urlRoot: string, route: Route<T>) {
        // `GET /:resources`
        console.log(`Adding route "GET ${urlRoot}"`);
        this.app.get(`${urlRoot}`, async (req, res) => {
            try {
                const searchParams = this.parseSearchParams(req);
                const results = await route.list(req, searchParams);
                res.json(results);
            } catch (err) {
                // TODO: as of "express v-next", async-rejected routes will be unwrapped automatically :D
                // ... currently, "unhandledRejection" events kill the app. :|
                console.log(`Error occurred in route "GET ${urlRoot}/" - `);
                console.log(err);
                res.status(500).send('Server Error');
            }
        });

        // `GET /:resources/:id`
        if (route.lookup) {
            console.log(`Adding route "GET ${urlRoot}/:id"`);
            this.app.get(`${urlRoot}/:id`, async (req, res) => {
                const id = req.params.id;
                try {
                    const results = await route.lookup!(id);
                    if (results) {
                        res.json(results);
                    } else {
                        res.status(404).send('Not Found');  
                    }
                } catch (err) {
                    console.log(`Error occurred in route "GET ${urlRoot}/${id}" - `);
                    console.log(err);
                    res.status(500).send('Server Error');
                }
            });
        } else {
            console.log(`Skipping route "GET ${urlRoot}/:id"`);
        }

        // TODO: `POST /:resources`
        // console.log(`Skipping route "POST ${urlRoot}"`)
        // this.app.post(`${urlRoot}`, (req, res) => {
        //     // console.log(`Not allowed to call "POST ${urlRoot}"`);
        //     // res.status(405).send('Method Not Allowed');
        //     throw new Error(`Not allowed to call "POST ${urlRoot}"`);
        // });
        // TODO: `PUT /:resources/:id`
        // this.app.put(...);
        // TODO: `DELETE /:resources/:id`
        // this.app.delete(...);
    }

    private parseSearchParams(req: express.Request): SearchParams {
        //TODO: implement, validate, sanitize (and standardize defaults)
        return { page: 1, perPage: 10 };
    }
}
