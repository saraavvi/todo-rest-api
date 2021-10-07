const request = require('supertest');
const app = require('../server');

let token;

describe('routes', () => {
  before((done) => {
    request(app)
      .post('/api/users/login')
      .send({ email: 'sara@viktorsson.com', password: 'pass1234' })
      .expect(200)
      .end((err, res) => {
        token = res.body.token;
        console.log(token);
        done();
      });
  });

  describe('GET api/lists', () => {
    it('responds with fail', (done) => {
      console.log('token is:' + token);
      request(app)
        .get('/api/lists')
        .set({ Authorization: `Bearer ${token}` })
        .expect(200, done);
    });
  });
});
