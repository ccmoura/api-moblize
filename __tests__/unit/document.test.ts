import DocumentValidator from '../../src/app/controllers/utils/DocumentValidator';

describe('Document validator', () => {
  // false
  it('should return false for cpf', async () => {
    const response = DocumentValidator.cpf('66211474000');

    expect(response).toBe(false);
  });
  it('should return false for cpf', async () => {
    const response = DocumentValidator.cpf('11511511501');

    expect(response).toBe(false);
  });
  it('should return false for cnpj', async () => {
    const response = DocumentValidator.cnpj('22411560604230');

    expect(response).toBe(false);
  });
  // true
  it('should return true for cpf', async () => {
    const response = DocumentValidator.cpf('22664907026');

    expect(response).toBe(true);
  });

  it('should return true for cpf', async () => {
    const response = DocumentValidator.cpf('04869451034');

    expect(response).toBe(true);
  });
  it('should return true for cnpj', async () => {
    const response = DocumentValidator.cnpj('81174440000167');

    expect(response).toBe(true);
  });
});
