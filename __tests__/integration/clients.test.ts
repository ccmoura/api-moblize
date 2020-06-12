import request from 'supertest';

import app from '../../src/server';

describe('clients', () => {
  it('should list all registered clients', async () => {
    const response = await request(app).get('/clients');

    expect(response.status).toBe(200);
  });

  it('should create a new client', async () => {
    const response = await request(app)
    .post('/clients')
    .send({
      name: "José teste",
      cpf_cnpj: "18375303003",
      birth_date: "05-05-1990",
      zipcode: "08226021",
      number: 5,
      complement: "Casa",
      email: "emailteste90@hotmail.com",
      password: "Senhate$te1",
      repeat_password: "Senhate$te1",
      repeat_email: "emailteste90@hotmail.com"
    });

    expect(response.status).toBe(201);
  });
});
// login test
describe('sessions', () => {

  it('should login as client', async () => {
    const response = await request(app)
    .post('/sessions')
    .send({
      email: "emailteste@gmail.com",
	    password: "Senhate$te1"
    });

    expect(response.status).toBe(201);
  });
});
