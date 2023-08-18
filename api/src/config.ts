import { Pool } from "pg";

interface Env {
    [key: string]: string | undefined;
}

export type PoolFactory = (settings: Settings) => Pool;

export interface Settings {
    port: number;
    baseUrl: string;
    dbConnectionString: string;
    poolFactory: PoolFactory;
}

export let defaultSettings: Settings = {
    port: 8080,
    baseUrl: '/v1',
    dbConnectionString: 'postgresql://',
    poolFactory: (settings: Settings) => {
        return createPool(settings.dbConnectionString);
    },
};

export function parseSettings(env: Env = process.env): Settings {
    const port = parseInt(env.PORT || '0', 10) || defaultSettings.port;
    const baseUrl = env.API_URL || defaultSettings.baseUrl;
    console.log('Environment DB_URL: ' + env.DB_URL);
    const dbConnectionString = env.DB_URL || defaultSettings.dbConnectionString;
    console.log('dbConnectionString: ' + dbConnectionString);
    const poolFactory = defaultSettings.poolFactory;
    console.log('Environment:');
    console.log(env);
    return {
        port,
        dbConnectionString,
        baseUrl,
        poolFactory,
    }
}

function createPool(connectionString: string): Pool {
    console.log(`Database connection string: ${connectionString}`);
    return new Pool({
        connectionString, // Looks like: postgresql://username:password@host:port/database
        
        // max?: number | undefined;
        // min?: number | undefined;
        // idleTimeoutMillis?: number | undefined;
        // log?: ((...messages: any[]) => void) | undefined;
        // Promise?: PromiseConstructorLike | undefined;
        // allowExitOnIdle?: boolean | undefined;
        // maxUses?: number | undefined;
        // user?: string | undefined;
        // database?: string | undefined;
        // password?: string | (() => string | Promise<string>) | undefined;
        // port?: number | undefined;
        // host?: string | undefined;
        // connectionString?: string | undefined;
        // keepAlive?: boolean | undefined;
        // stream?: () => stream.Duplex | stream.Duplex | undefined;
        // statement_timeout?: false | number | undefined;
        // ssl?: boolean | ConnectionOptions | undefined;
        // query_timeout?: number | undefined;
        // keepAliveInitialDelayMillis?: number | undefined;
        // idle_in_transaction_session_timeout?: number | undefined;
        // application_name?: string | undefined;
        // connectionTimeoutMillis?: number | undefined;
        // types?: CustomTypesConfig | undefined;
        // options?: string | undefined;
    });
}
