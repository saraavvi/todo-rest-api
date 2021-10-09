const request = require('supertest');
const app = require('../server');

let token;
let listId;
const userCredentials = {
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD,
};

describe('Todo REST API routes', () => {
  describe('Sending a POST request with correct username and password to /api/users/login', () => {
    it('should respond with 200 and return json.', (done) => {
      request(app)
        .post('/api/users/login')
        .send(userCredentials)
        .expect((res) => {
          token = res.body.token;
        })
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Sending a GET request with a valid jwt to /api/lists', () => {
    it('should respond with 200 and return json.', (done) => {
      request(app)
        .get('/api/lists')
        .set({ Authorization: `Bearer ${token}` })
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('Sending a POST request with a valid jwt and title and body to /api/lists', () => {
    it('should respond with 201 and return json.', (done) => {
      request(app)
        .post('/api/lists')
        .send({ title: 'A title', body: 'some content' })
        .set({ Authorization: `Bearer ${token}` })
        .expect((res) => {
          listId = res.body.data.list._id;
        })
        .expect('Content-Type', /json/)
        .expect(201, done);
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
