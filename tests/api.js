'use strict';

/* global it, describe, afterEach */
require('./setup/');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);

describe('API test ping pong', () => {
  it('/GET /v1/ping - it should get pong', (done) => {
    chai.request(server)
      .get('/v1/ping')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('pong').eql(true);
        done();
      });
  });
});

describe('API test all data is good - positive scenario', () => {
  it('/POST /v1/notes - it should save note', (done) => {
    const note = {
      title: 'test title',
      message: 'test message',
    };
    chai.request(server)
      .post('/v1/notes')
      .send(note)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('title').eql('test title');
        res.body.should.have.property('message').eql('test message');
        // res.body.should.have.property('create_date');
        // res.body.should.have.property('modified_date');
        done();
      });
  });

  afterEach(() => {
    server.close();
  });
});
