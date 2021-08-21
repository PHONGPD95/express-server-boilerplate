import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import morgan from 'morgan';

import api from '~api/index';
import * as database from '~models/index';
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
} from '~utils/errors';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(fileUpload());

app.use('/api', api);

// eslint-disable-next-line no-unused-vars
app.use((_req, _res, _next) => {
  throw new NotFoundError();
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err) {
    console.error(err.stack);
  }

  let statusCode = 500;
  if (err instanceof BadRequestError) {
    statusCode = 400;
  }
  if (err instanceof UnauthorizedError) {
    statusCode = 401;
  }
  if (err instanceof ForbiddenError) {
    statusCode = 403;
  }
  if (err instanceof NotFoundError) {
    statusCode = 404;
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    error: err.message || 'Internal Server Error.',
  });
});

database.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server app listening at http://localhost:${PORT}`);
  });
});
