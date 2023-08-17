import { ShowsRoute } from "./routes/shows.route";
import { Settings, createPool } from "./config";
import { AppBuilder } from "./rest-app";

export function buildApp(settings: Settings) {
    const pool = createPool(settings);
    const app = new AppBuilder(settings)
        .addResourceCollection('shows', new ShowsRoute(pool))
        .build();
    return app;
}
