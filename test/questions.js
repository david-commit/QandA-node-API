const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../app');

// Assertion style
chai.should();

// Middleware
chai.use(chaiHttp);

describe('Question Responses', () => {
  // GET all Route
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

  // GET single Route
  describe('GET all questions', () => {
    it('Should get single question by ID', (done) => {
      const qId = 1 || 2 || 3;
      chai
        .request(server)
        .get(`/questions/${qId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.should.have.property('user_id');
          response.body.should.have.property('answers').that.is.a('array')
          done();
        });
    });
  });
});
