import { ShowsRoute } from "./routes/shows.route";
import { Settings, defaultSettings } from "./config";
import { AppBuilder } from "./rest-app";
import { RootRoute } from "./routes/root.route";
import { Routes, join } from "./routes/routes";

// TODO: extract `buildApp(...)` elsewhere...
export function buildApp(partialSettings: Partial<Settings> = defaultSettings) {
    const settings = { ...defaultSettings, ...partialSettings };
    const baseUrl = settings.baseUrl;
    const pool = settings.poolFactory();
    const app = new AppBuilder(settings)
        .addResourceCollection(Routes.ROOT, new RootRoute(join(baseUrl, Routes.ROOT)))
        .addResourceCollection(Routes.SHOWS, new ShowsRoute(join(baseUrl, Routes.SHOWS), pool))
        .build();
    return app;
}
