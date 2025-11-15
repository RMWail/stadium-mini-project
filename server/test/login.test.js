import request from 'supertest';
import db from '../config/db.js'; 
import server from '../server.js'; 
// $2b$10$xcntBsHL9LM36s34ereRle3vY5vz8.5RlxzlisG1VUH5vz19QHRcW
describe('Login Route Integration Test', () => {


  test(' Login successfully with valid credentials Test', async () => {
    const response = await request(server).get('/login')
      .query({
        Username: 'wail2003',     
        Password: '123456'    
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('negative');
  });

  test('Incorrect password Test', async () => {
    const response = await request(server).get('/login')
      .query({
        Username: 'univBusAdmin',
        Password: 'wrongpass'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('negative');
  });

  test('Unknow sername 404 return Test', async () => {
    const response = await request(server)
      .get('/login')
      .query({
        Username: 'nonexistent',
        Password: 'any'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('negative');
  });
  
  afterAll(async() => {
       await db.end();
  });
});
