import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import ratelimit from './app/middlewares/RateLimit';

import routes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(ratelimit);
app.use(express.json());

app.use(routes);

export default app;
