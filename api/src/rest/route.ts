import express from 'express';
import { SearchParams } from "./search-params";
import { SearchResults } from "./search-results";

export interface Route<T> {
    list(req: express.Request, params: SearchParams): Promise<SearchResults<T>>;
    lookup?(id: string): Promise<T | undefined>; // TODO(REST): how to magically add "metadata" (e.g. links) to a POD type??
}
