/* eslint-disable node/no-process-env */

export default {
    nodeEnv: (process.env.NODE_ENV ?? ''),
    port: (process.env.PORT ?? 0),
    database: {
        host: process.env.DATA_HOST,
        port: Number.parseInt(process.env.DATA_PORT ?? '5432', 10),
        username: process.env.DATA_USERNAME,
        password: process.env.DATA_PASSWORD,
        database: process.env.DATA_DATABASE,
    },
} as const;
