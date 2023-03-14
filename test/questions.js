const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const { response } = require('../app');
const server = require('../app');

// Assertion style
chai.should();

// Middleware
chai.use(chaiHttp);

describe('Question Resources', () => {
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
  describe('GET specific question', () => {
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
          response.body.should.have.property('answers').that.is.a('array');
          done();
        });
    });
  });

  // Question not Found (404)
  describe('GET should respond with a 404', () => {
    it('Should respond question not found', (done) => {
      const qId = 1000;
      chai
        .request(server)
        .get(`/questions/${qId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a('object');
          response.body.should.have.property('msg');
          done();
        });
    });
  });

  // Check for user token before POSTing a question
  describe('Non-logged in user POSTing a question', () => {
    it('Should return a Forbidden eror', (done) => {
      const question = { question: 'This is a test question', user_id: 1 };
      chai
        .request(server)
        .post(`/questions`)
        .send(question)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a('object');
          response.body.should.have.property(
            'msg',
            'Not authorized, please log in'
          );
        });
        done()
    });
  });


});
