import { Application } from "express";
import { Pool, QueryResult, QueryResultRow } from "pg";
import { buildApp } from "../routes";
import { instance, mock } from 'ts-mockito';
import { defaultSettings } from "../config";

export const baseUrl = defaultSettings.baseUrl;

export function buildAppWithMockPool(poolHelper: (pool: Pool) => void): Application {
    const mockedPool = mock(Pool);
    poolHelper(mockedPool);
    const settings = {
        baseUrl,
        poolFactory: () => instance(mockedPool),
    };
    return buildApp(settings);
}

export function buildQueryResult<T extends QueryResultRow>(rows: T[]): QueryResult<T> {
    return {
        rows,
        oid: 1,
        command: "",
        rowCount: rows.length,
        fields: [],
    };
}
