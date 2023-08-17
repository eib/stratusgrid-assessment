import { Route } from "../rest/route";
import { HalLink } from "hal-types";
import { Routes, join } from "./routes";

/**
 * The HATEOS-aware API root collection.
 * Used to allow clients to dynamically discover endpoints (as implemented/included below).
 */
export class RootRoute implements Route<HalLink> {
    constructor(private baseUrl: string) {}

    async list(): Promise<Record<string, HalLink>> {
       return {
            self: {
                href: join(this.baseUrl, Routes.ROOT),
            },
            shows: {
                href: join(this.baseUrl, Routes.SHOWS),
            },
       };
    }
}
