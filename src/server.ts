import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';

import 'express-async-errors';

import config from '@shared/config';
import { NodeEnvironments } from '@shared/enums';
import baseRouter from '@routes/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (config.nodeEnv === NodeEnvironments.DEVELOPMENT) app.use(morgan('dev'));

// Security
if (config.nodeEnv === NodeEnvironments.PRODUCTION) app.use(helmet());

// Add APIs
app.use('/', baseRouter);

export default app;
