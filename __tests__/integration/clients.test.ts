const request = require('supertest');

const app = require('../../src/server');

describe('clients', () => {
  it('should list all registered clients', async () => {
    const response = await request(app).get('/clients');

    expect(response.status).toBe(200);
  });
});
