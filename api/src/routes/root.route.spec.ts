import { describe, expect, test } from "@jest/globals";
import {RootRoute} from "./root.route";
import { Routes, join } from "./routes";
import { baseUrl } from "./test-helpers";

describe("/", () => {
    test("should return a link to `shows` endpoint", async () => {
        const route = new RootRoute(baseUrl);
        expect(await route.list()).toHaveProperty('shows.href', `${baseUrl}/${Routes.SHOWS}`);
    });
});
