import './pre-start';
import '@services/dataSource';

import logger from 'jet-logger';
import config from '@shared/config';
import server from './server';

server.listen(
    config.port,
    () => logger.info(`Express server started on port: ${config.port}`),
);
