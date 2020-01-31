const server = require('./server');
const request = require('supertest');


describe('Server file', () => {
  test('should use the correct environment setting', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })
  
})
