import express from 'express';
import { RestfulRouteAdapter } from './rest/restful-route-adapter';
import { Settings } from './config';
import { Route } from './rest/route';
import { join } from './routes/routes';

export interface ExpressAppBuilder {
    addResourceCollection<T>(resourceName: string, route: Route<T>): ExpressAppBuilder;
    build(): express.Express;
}

export class AppBuilder {
    private baseUrl: string;
    private app: express.Express;
    private adapter: RestfulRouteAdapter;

    constructor(settings: Settings) {
        this.app = express();
        this.baseUrl = settings.baseUrl;
        this.adapter = new RestfulRouteAdapter(this.app, settings.baseUrl);
    }

    build(): express.Express {
        return this.app;
    }

    addResourceCollection<T>(resourceName: string, route: Route<T>): ExpressAppBuilder {
        console.log(`Adding routes for "${resourceName}" ...`);
        this.adapter.buildRoute(join(this.baseUrl, resourceName), route);
        return this;
    }
}
