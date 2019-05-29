const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../src/app');

const baseUrl = '/api/v1';

describe('Test cases for /contacts', function() {
    describe('GET /contacts', function() {
        it('responds with json', function(done) {
          request(app)
            .get(baseUrl + '/contacts')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('POST /contacts and GET /contacts/:id', function() {
        it('responds with json', function(done) {
          request(app)
            .post(baseUrl + '/contacts')
            .send({
                "name": "test1",
                "phone": [{
                    "number": "9876543210"
                }],
                "email": [{
                    "emailId": "test1@gmail.com",
                    "tag": "personal"
                }]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.id).to.exist;

                request(app)
                    .get(baseUrl + '/contacts/' + res.body.id)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });
    });

    describe('GET /contacts/search', function() {
        it('responds with 200', function(done) {
            request(app)
                .get(baseUrl + '/contacts/search')
                .query({ query: 'dummy'})
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /contacts/search', function() {
        it('responds with correct results', function(done) {
            request(app)
            .post(baseUrl + '/contacts')
            .send({
                "name": "test3",
                "phone": [{
                    "number": "9876543210"
                }],
                "email": [{
                    "emailId": "test3@gmail.com",
                    "tag": "personal"
                }]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                request(app)
                .get(baseUrl + '/contacts/search')
                .query({ query: 'test'})
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    
                    expect(res.body.length).to.be.greaterThan(0);
                    expect(res.body[0].name).to.contain('test');
                    done();
                });
            });

        });
    });

    describe('DELETE /contacts/:id', function() {
        it('responds with json', function(done) {
          request(app)
            .post(baseUrl + '/contacts')
            .send({
                "name": "test4",
                "phone": [{
                    "number": "9876543210"
                }],
                "email": [{
                    "emailId": "test1@gmail.com",
                    "tag": "personal"
                }]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.id).to.exist;

                request(app)
                    .delete(baseUrl + '/contacts/' + res.body.id)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });
    });

    describe('PUT /contacts/:id', function() {
        it('responds with 200 and updated json', function(done) {
            request(app)
              .post(baseUrl + '/contacts')
              .send({
                  "name": "test1",
                  "phone": [{
                      "number": "9876543210"
                  }],
                  "email": [{
                      "emailId": "test@gmail.com",
                      "tag": "personal"
                  }]
              })
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                  if (err) return done(err);
                    expect(res.body.id).to.exist;

                    const modifiedRes = res.body;
                    modifiedRes.name = "test2";
                    modifiedRes.phone[0].number = "9876543211";
                    modifiedRes.email[0].emailId = "test2@gmail.com";
                    modifiedRes.email[0].tag = "work";

                    request(app)
                        .put(baseUrl + '/contacts/' + res.body.id)
                        .send(modifiedRes)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
                            if (err) return done(err);
                            
                            expect(res.body.id).to.equal(modifiedRes.id);
                            expect(res.body.name).to.equal(modifiedRes.name);
                            expect(res.body.phone[0].number).to.equal(modifiedRes.phone[0].number);
                            expect(res.body.email[0].emailId).to.equal(modifiedRes.email[0].emailId);
                            expect(res.body.email[0].tag).to.equal(modifiedRes.email[0].tag);
                            done();
                        });
                });
          });
    });
    
    describe('POST /contacts', function() {
        it('responds with 400 invalid body', function(done) {
          request(app)
            .post(baseUrl + '/contacts')
            .send({
                "name": "test1",
                "phone": [{
                    "number": "98765432101"
                }],
                "email": [{
                    "emailId": "test1@gmail.com",
                    "tag": "personal"
                }]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('POST /contacts', function() {
        it('responds with 400 invalid body', function(done) {
          request(app)
            .post(baseUrl + '/contacts')
            .send({
                "name": "test1",
                "phone": [{
                    "number": "9876543210"
                }],
                "email": [{
                    "emailId": "test1gmail.com",
                    "tag": "personal"
                }]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('GET /contacts/invalid', function() {
        it('responds with 400', function(done) {
          request(app)
            .get(baseUrl + '/contacts/invalid')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('GET /contacts/:id', function() {
        it('responds with 404 on non existent id', function(done) {
          request(app)
            .get(baseUrl + '/contacts/000000000000000000000000')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('DELETE /contacts/invalid', function() {
        it('responds with 400', function(done) {
          request(app)
            .delete(baseUrl + '/contacts/invalid')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('DELETE /contacts/:id', function() {
        it('responds with 404', function(done) {
          request(app)
            .delete(baseUrl + '/contacts/5cec106a90788970d7d99503')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('PUT /contacts/invalid', function() {
        it('responds with 400', function(done) {
          request(app)
            .put(baseUrl + '/contacts/invalid')
            .send({})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('PUT /contacts/:id', function() {
        it('responds with 404 on non existent id', function(done) {
            request(app)
              .put(baseUrl + '/contacts/000000001111111100110011')
              .send({
                  "name": "test1",
                  "phone": [{
                      "number": "9876543210"
                  }],
                  "email": [{
                      "emailId": "test@gmail.com",
                      "tag": "personal"
                  }]
              })
              .set('Accept', 'application/json')
              .expect(404)
              .end(function(err, res) {
                  if (err) return done(err);
                  done();
              });
        });
    });

    describe('POST /contacts/:id', function() {
        it('responds with 405 method not allowed', function(done) {
            request(app)
              .post(baseUrl + '/contacts/000000001111111100110011')
              .send({
                  "name": "test1",
                  "phone": [{
                      "number": "9876543210"
                  }],
                  "email": [{
                      "emailId": "test@gmail.com",
                      "tag": "personal"
                  }]
              })
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(405)
              .end(function(err, res) {
                  if (err) return done(err);
                  done();
              });
        });
    });
});


