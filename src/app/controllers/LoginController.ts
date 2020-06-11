import {Request, Response} from 'express';
import knex from './../../database/connection.ts';

class LoginController {
  async store(req: Request, res: Response){
    return res.json({ok: true});
  }
}

export default new LoginController();
