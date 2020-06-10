import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(helmet());
app.use(cors({
  origin:
      process.env.NODE_ENV.trim() === 'development' ||
      process.env.NODE_ENV.trim() === 'test'
        ? false
        : process.env.FRONT_URL,
}));

app.use(routes);

export default app;
