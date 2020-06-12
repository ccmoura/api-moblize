import {Request, Response} from 'express';
import knex from './../../database/connection';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import loginConfig from '../../config/Login';

class LoginController {
  async store(req: Request, res: Response){
    const { email, password } = req.body;
    const client = await knex('clients').where('email', email).first();

    if (!client) {
      return res.status(401).json({ error: 'Client not found.' });
    }

    const passwordMatches = await bcrypt.compareSync(password, client.password);

    if (!passwordMatches) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name } = client;

    return res.json({
      client: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, loginConfig.secret || 'secret', {
        expiresIn: loginConfig.expiresIn,
      }),
    });
  }
}

export default new LoginController();
