import { Pool } from "pg";

interface Env {
    [key: string]: string | undefined;
}

export interface Settings {
    port: number;
    baseUrl: string;
    dbConnectionString: string;
}

export function parseSettings(env: Env = process.env): Settings {
    // TODO: ensure trim trailing-slash from base URL
    const port = parseInt(env.PORT || '8080', 10);
    const baseUrl = '/api';
    const dbConnectionString = env.DB_URL || 'postgresql://';
    return {
        port,
        dbConnectionString,
        baseUrl,
    }
}

export function createPool(settings: Settings): Pool {
    console.log(`Database connection string: ${settings.dbConnectionString}`);
    return new Pool({
        connectionString: settings.dbConnectionString,
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