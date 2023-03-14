const chai = require('chai');
const chaiHttp = require('chai-http');
const { it } = require('mocha');
const server = require('../app');

// Assertion style
chai.should();

// Middleware
chai.use(chaiHttp);

describe('User registration and authentication', () => {
  // User Registeration
  describe('POST Creating a new user', () => {
    it('Should create a new user', (done) => {
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
          response.should.have.status(201);
          response.body.should.to.be.an('object');
          response.body.should.to.have.property('newuser');
          response.body.should.to.have.property('token');
        });
      done();
    });
  });

  // User Login & Authentication
  describe('Authenticate existing user', () => {
    it('Should return a 200 and user token', (done) => {
      const user = {
        email: 'test@gmail.com',
        password: 'testuser',
      };
      chai
        .request(server)
        .post(`/auth/login`)
        .send(user)
        .end((err, response) => {
          response.should.status(200);
          response.body.should.to.be.an('object');
          response.body.should.to.have.property('email').eq('test@gmail.com');
        });
      done();
    });
  });
});
