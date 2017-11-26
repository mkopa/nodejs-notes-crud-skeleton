'use strict';

/* global it, describe, afterEach */
require('./setup/');

const chai = require('chai');
const chaiHttp = require('chai-http');
const randomstring = require('randomstring');
const server = require('../index');

chai.use(chaiHttp);

describe('API ping pong test', () => {
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

describe('API notes test', () => {
  let noteId = 0;

  describe('/POST /v1/notes (Insert new note)', () => {
    it('it should save note', (done) => {
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
          res.body.should.have.property('id');
          res.body.should.have.property('title').eql('test title');
          res.body.should.have.property('message').eql('test message');
          done();
        });
    });

    it('it should not save note (Parameter \'title\' can not be empty error)', (done) => {
      const note = {
        message: 'test message',
      };
      chai.request(server)
        .post('/v1/notes')
        .send(note)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(400);
          res.body.should.have.property('message');
          res.body.message.should.be.a('array');
          res.body.message.should.have.length(1);
          res.body.message[0].should.be.a('string').eql("Parameter 'title' can not be empty");
          done();
        });
    });

    it('it should not save note (Parameters \'title\' and \'message\' can not be empty error)', (done) => {
      chai.request(server)
        .post('/v1/notes')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(400);
          res.body.should.have.property('message');
          res.body.message.should.be.a('array');
          res.body.message.should.have.length(2);
          res.body.message[0].should.be.a('string').eql("Parameter 'title' can not be empty");
          res.body.message[1].should.be.a('string').eql("Parameter 'message' can not be empty");
          done();
        });
    });

    it('it should not save note (Parameter \'title\' length is too long error > 40 chars)', (done) => {
      const note = {
        title: randomstring.generate({ length: 401, charset: 'alphabetic' }),
        message: 'test message',
      };
      chai.request(server)
        .post('/v1/notes')
        .send(note)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(400);
          res.body.should.have.property('message');
          res.body.message.should.be.a('array');
          res.body.message.should.have.length(1);
          res.body.message[0].should.be.a('string').eql("Parameter 'title' length is too long");
          done();
        });
    });

    it('it should not save note (Parameter \'message\' length is too long error > 4001 chars)', (done) => {
      const note = {
        title: 'test title',
        message: randomstring.generate({ length: 4001, charset: 'alphabetic' }),
      };
      chai.request(server)
        .post('/v1/notes')
        .send(note)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(400);
          res.body.should.have.property('message');
          res.body.message.should.be.a('array');
          res.body.message.should.have.length(1);
          res.body.message[0].should.be.a('string').eql("Parameter 'message' length is too long");
          done();
        });
    });
  });

  describe('/GET /v1/notes (Read all notes)', () => {
    it('it should read all notes', (done) => {
      chai.request(server)
        .get('/v1/notes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('count');
          res.body.count.should.be.a('number');
          res.body.should.have.property('results');
          res.body.results.should.be.a('array');
          res.body.results.should.have.length(1);
          res.body.results[0].should.have.property('id');
          res.body.results[0].should.have.property('title').eql('test title');
          res.body.results[0].should.have.property('message').eql('test message');
          res.body.results[0].should.have.property('createdAt');
          res.body.results[0].should.have.property('modifiedAt');
          noteId = res.body.results[0].id;
          done();
        });
    });
  });

  describe(`/GET /v1/notes/${noteId} (Read note with specified Id)`, () => {
    it(`it should read note with id = ${noteId}`, (done) => {
      chai.request(server)
        .get(`/v1/notes/${noteId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(noteId);
          res.body.should.have.property('title').eql('test title');
          res.body.should.have.property('message').eql('test message');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('modifiedAt');
          done();
        });
    });

    it('it should not read note (Id is not a number error)', (done) => {
      chai.request(server)
        .get('/v1/notes/20fh')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(400);
          res.body.should.have.property('message').eql('Id is not a number');
          done();
        });
    });

    it('it should not read note (Not found error)', (done) => {
      chai.request(server)
        .get('/v1/notes/123456789')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(404);
          res.body.should.have.property('message').eql('Not found');
          done();
        });
    });
  });

  describe(`/PUT /v1/notes/${noteId} (Update note)`, () => {
    it('it should update note', (done) => {
      const note = {
        title: 'updated title',
        message: 'updated message',
      };
      chai.request(server)
        .put(`/v1/notes/${noteId}`)
        .send(note)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('title').eql('updated title');
          res.body.should.have.property('message').eql('updated message');
          done();
        });
    });

    it('it should not update note (Id is not a number error)', (done) => {
      chai.request(server)
        .put('/v1/notes/20fh')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(400);
          res.body.should.have.property('message').eql('Id is not a number');
          done();
        });
    });

    it('it should not update note (Not found error)', (done) => {
      chai.request(server)
        .put('/v1/notes/123456789')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('code').eql(404);
          res.body.should.have.property('message').eql('Not found');
          done();
        });
    });
  });

  afterEach(() => {
    server.close();
  });
});
