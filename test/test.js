const request = require('supertest');
const app = require('../server');

let token;
let listId;
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

  describe('POST api/lists', () => {
    it('should respond with 201', (done) => {
      request(app)
        .post('/api/lists')
        .send({ title: 'A title', body: 'some content' })
        .set({ Authorization: `Bearer ${token}` })
        .expect(201)
        .end((err, res) => {
          listId = res.body.data.list._id;
          done();
        });
    });
  });

  describe(`DELETE api/lists/${listId}`, () => {
    it('should respond with 204', (done) => {
      request(app)
        .delete(`/api/lists/${listId}`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(204, done);
    });
  });
});
