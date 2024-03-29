import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import BaseRouter from './routes/api';
import logger from 'jet-logger';
import EnvVars from '@src/configurations/EnvVars';
import HttpStatusCodes from '@src/configurations/HttpStatusCodes';
import { NodeEnvs } from '@src/declarations/enums';
import { RouteError } from '@src/declarations/classes';
import sequelize from './configurations/sqlite';
import fileService from "./services/file-service"
import cors from 'cors'
import docsRoutes from './routes/docs-routes';
const connect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.drop()
    await sequelize.sync();
    fileService.crawlAndCreate()
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connect()
// **** Init express **** //

const app = express();


// **** Set basic express settings **** //
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.nodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}
// **** Add API routes **** //
// Add APIs
app.use(docsRoutes.paths.basePath, BaseRouter);

// Setup error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  logger.err(err, true);
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});


app.use(express.static(path.join(process.cwd(), "git_repo")));





// **** Export default **** //

export default app;
