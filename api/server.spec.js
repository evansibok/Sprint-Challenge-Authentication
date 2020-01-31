const server = require('./server');
const request = require('supertest');


describe('Server file', () => {
  test('should use the correct environment setting', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })

  describe("Main '/api' endpoint", () => {
    test('should return 200 OK', () => {
      return request(server).get('/api').expect(200);
    })
    
    test('should return json content-type', async () => {
      const res = await request(server).get('/api');

      expect(res.body).toMatchObject({ api: "up" })
    })
    
  })
  
  
})
