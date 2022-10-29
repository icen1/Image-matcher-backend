/* eslint-disable node/no-process-env */

export default {
    nodeEnv: (process.env.NODE_ENV ?? ''),
    port: (process.env.PORT ?? 0),
    db: process.env.DB_CONNECTION_URL,
} as const;
