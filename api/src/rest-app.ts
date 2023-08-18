import express from 'express';
import { RestfulRouteAdapter } from './rest/restful-route-adapter';
import { Settings } from './config';
import { Route } from './rest/route';
import { join } from './routes/routes';
import bodyParser from 'body-parser';

export interface ExpressAppBuilder {
    addResourceCollection<TResource>(resourceName: string, route: Route<TResource>): ExpressAppBuilder;
    build(): express.Express;
}

export class AppBuilder {
    private baseUrl: string;
    private app: express.Express;
    private adapter: RestfulRouteAdapter;

    constructor(settings: Settings) {
        this.baseUrl = settings.baseUrl;
        this.app = express()
            .use(bodyParser.json())
            .use(bodyParser.urlencoded());
        this.adapter = new RestfulRouteAdapter(this.app, settings.baseUrl);
    }

    build(): express.Express {
        return this.app;
    }

    addResourceCollection<TResource>(resourceName: string, route: Route<TResource>): ExpressAppBuilder {
        console.log(`Adding routes for "${resourceName}" ...`);
        this.adapter.buildRoute(join(this.baseUrl, resourceName), route);
        return this;
    }
}
