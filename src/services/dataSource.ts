import { DataSource } from 'typeorm';
import logger from 'jet-logger';

import config from '@shared/config';

const dataSource = new DataSource({
    type: 'postgres',
    ...config.database,
    entities: [],
    synchronize: true,
});

const msg = `Connected to database at: \
${config.database.host ?? 'localhost'}:${config.database.port}`;
dataSource.initialize().then(() => logger.info(msg));

export default dataSource;
