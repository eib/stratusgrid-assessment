import { ShowsRoute } from "./routes/shows.route";
import { Settings, defaultSettings } from "./config";
import { AppBuilder } from "./rest-app";
import { RootRoute } from "./routes/root.route";
import { Routes, join } from "./routes/routes";

// TODO: rename this file more appropriately
export function buildApp(partialSettings?: Partial<Settings>) {
    const settings = { ...defaultSettings, ...partialSettings };
    console.log('Actual settings: ');
    console.log(settings);
    const baseUrl = settings.baseUrl;
    const pool = settings.poolFactory(settings);
    const app = new AppBuilder(settings)
        .addResourceCollection(Routes.ROOT, new RootRoute(baseUrl))
        .addResourceCollection(Routes.SHOWS, new ShowsRoute(join(baseUrl, Routes.SHOWS), pool))
        .build();
    return app;
}
