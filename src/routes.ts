import express from 'express';

import ClientController from './app/controllers/ClientController';
import SessionController from './app/controllers/SessionController';

/** Use this authMiddleware on routes that require authentication (signed in user) */
import authMiddleware from './app/middlewares/Auth';
import bruteforce from './app/middlewares/BruteForce';

const routes = express.Router();

/** Client routes */
routes.post('/clients', ClientController.store);
routes.get('/clients', ClientController.index); // additional route
routes.delete('/clients/:id', ClientController.delete); // additional route

/** Login routes */
routes.post('/sessions', bruteforce.prevent, SessionController.store);

/** Other routes */
routes.get('/', (req, res) => { // additional route
  res.sendFile(`${__dirname}/app/views/welcome.html`);
});

export default routes;
