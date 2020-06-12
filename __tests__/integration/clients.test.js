const request = require('supertest');

const app = require('../../src/app');

describe('clients', () => {
  it('should register a new client', async () => {
    const response = await request(app)
      .get('/clients');

      expect(response.status).toBe(200);
  });
});
