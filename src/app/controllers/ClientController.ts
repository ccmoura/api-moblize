import {Request, Response} from 'express';
import axios from 'axios';
import knex from './../../database/connection.ts';
import * as Yup from 'yup';

import DocumentValidator from './utils/DocumentValidator.ts'

class ClientController {

  async store(req: Request, res: Response){
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf_cnpj: Yup.string().min(11).max(14).required(),  // regex
      birth_date: Yup.date().required(),
      zipcode: Yup.string().min(8).max(8).required(), // testar por api dos correios
      number: Yup.number().integer().required(),
      complement: Yup.string(),
      email: Yup.string().matches(emailRegex).required(),
      password: Yup.string().min(8).matches(passwordRegex).required(),  // 1 caractere especial 1 maiuscula 1 minuscula e 1 numero
      repeat_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.'),
      repeat_email: Yup.string().oneOf([Yup.ref('email'), null], 'E-mails must match.'),
    });

    const isValid = await schema.isValid(req.body);
    const spot = await axios.get(`viacep.com.br/ws/${zipcode}/json/`);
    const isValidDocument = DocumentValidator.cpf(req.body.cpf_cnpj) || DocumentValidator.cnpj(req.body.cpf_cnpj);
    // falta data mínima

    if(!isValid){
      return res.status(400).json({error: 'Client validation fails'});
    } else if (spot.erro){
      return res.status(400).json({error: 'Invalid zipcode'});
    } else if(!isValidDocument){
      return res.status(400).json({error: 'Invalid CPF/CNPJ'});
    } else {
      const {
        name,
        cpf_cnpj,
        birth_date,
        zipcode,
        number,
        complement,
        email,
        password,
      } = req.body;

      const uf = spot.data.uf;
      const city = spot.data.localidade;
      const public_area = spot.data.logradouro;

      const newClient = {
        name,
        cpf_cnpj,
        birth_date,
        zipcode,
        uf,
        city,
        public_area,
        number,
        complement,
        email,
        password,
      }

      const id = await knex.('clients').returning('id').insert(newClient);

      return res.status(201).json({
        id,
        ...newClient
      });
    }
  }

  async index(req: Request, res: Response){
    const allClients = await knex.from('clients').select(
      'id',
      'name',
      'cpf_cnpj',
      'birth_date',
      'zipcode',
      'uf',
      'city',
      'public_area',
      'number',
      'complement',
      'email'
      );

      return res.json(allClients);
  }

  async show(req: Request, res: Response){

  }

  async update(req: Request, res: Response){

  }

  async delete(req: Request, res: Response){

  }
}

export default new ClientController();
