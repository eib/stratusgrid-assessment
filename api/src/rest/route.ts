import express from 'express';
import { SearchParams } from "./search-params";
import { SearchResults } from "./search-results";

export interface Route<T> {
    list(req?: express.Request, params?: SearchParams): Promise<SearchResults<T> | Record<string, T>>;
    lookup?(id: string): Promise<T | undefined>;
}
