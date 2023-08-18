import express from 'express';
import { SearchParams } from "./search-params";
import { SearchResults } from "./search-results";
import { HalLink } from 'hal-types';

export interface Route<TResource> {
    list(req?: express.Request, params?: SearchParams): Promise<SearchResults<TResource> | Record<string, TResource>>;
    lookup?(id: string): Promise<TResource | undefined>;
    create?(data: Partial<TResource>): Promise<HalLink>;

    // TODO: update/delete methods
}
