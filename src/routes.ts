import express from 'express';

import ClientController from './app/controllers/ClientController';
import LoginController from './app/controllers/LoginController';

const routes = express.Router();

/** Client routes */
routes.post('/clients', ClientController.store);
routes.get('/clients', ClientController.index);
routes.get('/clients/:id', ClientController.show);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.delete);

/** Login routes */
routes.post('/clients', LoginController.store);

/** Other routes */
routes.get('/', (req, res) => {
  res.sendFile(`${__dirname}/app/views/welcome.html`);
});

export default routes;
