import {Request, Response} from 'express';
import axios from 'axios';
import knex from './../../database/connection';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import moment from 'moment';

import DocumentValidator from './utils/DocumentValidator';

class ClientController {

  async store(req: Request, res: Response){
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const birthRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf_cnpj: Yup.string().min(11).max(14).required(),
      birth_date: Yup.string().matches(birthRegex).required(),
      zipcode: Yup.string().min(8).max(8).required(),
      number: Yup.number().integer().required(),
      complement: Yup.string(),
      email: Yup.string().matches(emailRegex).required(),
      password: Yup.string().min(8).matches(passwordRegex).required(),
      repeat_password: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match.'),
      repeat_email: Yup.string().oneOf([Yup.ref('email'), ''], 'E-mails must match.'),
    });

    const isValidDocument = DocumentValidator.cpf(req.body.cpf_cnpj) || DocumentValidator.cnpj(req.body.cpf_cnpj);
    const isValidDate = moment(new Date(req.body.birth_date)).isBefore(new Date(moment().format("DD-MM-YYYY")));
    const documentExists = await knex('clients').where('cpf_cnpj', req.body.cpf_cnpj).first();
    const emailExists = await knex('clients').where('email', req.body.email).first();

    if(!isValidDocument){
      return res.status(400).json({error: 'Invalid CPF/CNPJ.'});
    } else if(documentExists) {
      return res.status(400).json({error: 'CPF/CNPJ already registered.'});
    } else if (emailExists) {
      return res.status(400).json({error: 'E-mail already registered.'});
    } else if (!isValidDate){
      return res.status(400).json({error: 'Invalid birth date.'});
    } else {
      await schema.validate(req.body).catch(error => {
        return res.status(400).json({error: 'Client validation fails.', message: error.message});
      });

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

      let uf = '';
      let city = '';
      let public_area = '';

      const response = await axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
      if(!response.data.erro){
        uf = response.data.uf;
        city = response.data.localidade;
        public_area = response.data.logradouro;
      } else {
        return res.status(400).json({error: 'Invalid zipcode'});
      }

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
        password: bcrypt.hashSync(password, 10),
      }

      const id = await knex('clients').returning('id').insert(newClient);

      return res.status(201).json({
        id: id[0],
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

      return res.status(200).json(allClients);
  }

  async delete(req: Request, res: Response){
    const { id } = req.params;
    const client = await knex('clients').where('id', id).first();

    if(!client){
      return res.status(400).json({message: `Client ${id} not found.`});
    } else {
      await knex('clients').where('id', id).del();

      return res.status(200).json({message: `Client ${id} deleted.`});
    }
  }
}

export default new ClientController();
