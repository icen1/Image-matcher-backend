import { DataSource } from 'typeorm';
import logger from 'jet-logger';

import config from '@shared/config';
import Image from '@entities/Image';

const dataSource = new DataSource({
    type: 'postgres',
    url: config.db,
    entities: [ Image ],
    synchronize: true,
});

const msg = `Connected to db`;
dataSource.initialize().then(() => logger.info(msg));

export default dataSource;
