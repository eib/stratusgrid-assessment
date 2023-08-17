import * as http from 'http';
import express from 'express';
import { RestfulRouteAdapter } from './rest/restful-route-adapter';
import { Settings } from './config';
import { Route } from './rest/route';

export interface ExpressAppBuilder {
    addResourceCollection<T>(resourceName: string, route: Route<T>): ExpressAppBuilder;
    build(): express.Express;
}

export class AppBuilder {
    private app: express.Express;
    private adapter: RestfulRouteAdapter;

    constructor(private settings: Settings) {
        this.app = express();
        this.adapter = new RestfulRouteAdapter(this.app, settings.baseUrl);
    }

    build(): express.Express {
        return this.app;
    }

    addResourceCollection<T>(resourceName: string, route: Route<T>): ExpressAppBuilder {
        // TODO: sanitize resourceName, check for convention conformance: [-a-Z0-9]+, check for uniqueness
        console.log(`Adding routes for "${resourceName}"`);
        this.adapter.buildRoute(`${this.settings.baseUrl}/${resourceName}`, route);
        return this;
    }
}
