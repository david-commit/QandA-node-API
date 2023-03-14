const chai = require('chai').expect;
const chaiHttp = require('chai-http');
const { it } = require('mocha');
const server = require('../app');

// Middleware
chai.use(chaiHttp);

describe('User registration and authentication', () => {
  // User Registeration
  describe('POST Create new user', () => {
    it('Should create a new user', () => {
      const user = {
        full_name: 'Test User',
        email: 'test@gmail.com',
        phone: '+25475455568',
        role: 'Community Developer',
        password: 'testuser',
      };
      chai
        .request(server)
        .post(`/auth/register`)
        .send(user)
        .end((err, response) => {
          response.body.expect.status(201);
          response.body.to.be.an('object');
          response.body.have.property('id');
        });
    });
  });


});
