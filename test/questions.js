const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../app');

// Assertion style
chai.should();

// Middleware
chai.use(chaiHttp);

describe('Question Responses', () => {
  // GET Route
  describe('GET all questions', () => {
    it('Should get all questions', (done) => {
      chai
        .request(server)
        .get('/questions')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          done();
        });
    });
  });
});
