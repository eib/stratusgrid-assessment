import { describe, expect, jest, test } from "@jest/globals";
import './config';
import { defaultSettings, parseSettings } from "./config";

jest.mock('pg'); // No DB calls, please

describe("parseSettings()", () => {
    test("should parse values from the environment", () => {
        const actual = parseSettings({
            PORT: '4321',
            API_URL: '/test-version',
            DB_URL: 'foo://bar:batz@quux:1234/blarg',
        });
        expect(actual).toMatchObject({
            port: 4321,
            baseUrl: '/test-version',
            dbConnectionString: 'foo://bar:batz@quux:1234/blarg',
        });
        expect(actual.poolFactory).toBeInstanceOf(Function);
        expect(actual.poolFactory(actual)).toBeTruthy();
    });

    test("should take default values when none specified", () => {
        const actual = parseSettings({});
        expect(actual).toMatchObject({ ...defaultSettings });
        expect(actual.poolFactory(actual)).toBeTruthy();
    });
});
