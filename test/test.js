const request = require('supertest');
const app = require('../server');

let token;
const userCredentials = {
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD,
};

describe('routes', () => {
  before((done) => {
    request(app)
      .post('/api/users/login')
      .send(userCredentials)
      .expect(200)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('GET api/lists', () => {
    it('should respond with 200', (done) => {
      request(app)
        .get('/api/lists')
        .set({ Authorization: `Bearer ${token}` })
        .expect(200, done);
    });
  });
});
