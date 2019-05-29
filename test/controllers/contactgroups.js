const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../src/app');

const baseUrl = '/api/v1';

describe('Test cases for /contact_groups', function () {
    describe('GET /contact_groups', function () {
        it('responds with json', function (done) {
            request(app)
                .get(baseUrl + '/contact_groups')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /contact_groups and GET /contact_groups/:id', function () {
        it('responds with json', function (done) {
            request(app)
                .post(baseUrl + '/contacts')
                .send({
                    "name": "test19",
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
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.id).to.exist;

                    request(app)
                        .post(baseUrl + '/contact_groups')
                        .send({
                            "name": "test_group_1",
                            "contacts": [{
                                "id": res.body.id
                            }]
                        })
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) return done(err);
                            expect(res.body.id).to.exist;

                            request(app)
                                .get(baseUrl + '/contact_groups/' + res.body.id)
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function (err, res) {
                                    if (err) return done(err);
                                    done();
                                });
                        });
                });
        });
    });

    describe('POST /contact_groups with multiple contacts and GET /contact_groups/:id', function () {
        it('responds with json', function (done) {

            const contact = {
                "name": "test20",
                "phone": [{
                    "number": "9876543210"
                }],
                "email": [{
                    "emailId": "test20@gmail.com",
                    "tag": "personal"
                }]
            };

            request(app)
                .post(baseUrl + '/contacts')
                .send(contact)
                .set('Accept', 'application/json')
                .end(function (err, res1) {
                    if (err) return done(err);

                    request(app)
                        .post(baseUrl + '/contacts')
                        .send(contact)
                        .set('Accept', 'application/json')
                        .end(function (err, res2) {
                            request(app)
                                .post(baseUrl + '/contact_groups')
                                .send({
                                    "name": "test_group_1",
                                    "contacts": [{
                                        "id": res1.body.id
                                    }, {
                                        "id": res2.body.id
                                    }]
                                })
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function (err, res) {
                                    if (err) return done(err);
                                    expect(res.body.id).to.exist;

                                    request(app)
                                        .get(baseUrl + '/contact_groups/' + res.body.id)
                                        .expect('Content-Type', /json/)
                                        .expect(200)
                                        .end(function (err, res) {
                                            if (err) return done(err);
                                            done();
                                        });
                                });
                        });

                });
        });
    });

    describe('PUT /contact_groups contacts and GET /contact_groups/:id', function () {
        it('responds with updated json', function (done) {

            const contact = {
                "name": "test20",
                "phone": [{
                    "number": "9876543210"
                }],
                "email": [{
                    "emailId": "test20@gmail.com",
                    "tag": "personal"
                }]
            };

            request(app)
                .post(baseUrl + '/contacts')
                .send(contact)
                .set('Accept', 'application/json')
                .end(function (err, res1) {
                    if (err) return done(err);
                    request(app)
                        .post(baseUrl + '/contact_groups')
                        .send({
                            "name": "test_group_2",
                            "contacts": [{
                                "id": res1.body.id
                            }]
                        })
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res2) {
                            if (err) return done(err);

                            expect(res2.body.id).to.exist;

                            request(app)
                                .post(baseUrl + '/contacts')
                                .send(contact)
                                .set('Accept', 'application/json')
                                .end(function (err, res3) {
                                    if (err) return done(err);
                                    request(app)
                                        .put(baseUrl + '/contact_groups/' + res2.body.id)
                                        .send({
                                            "name": "test_group_1",
                                            "contacts": [{
                                                "id": res3.body.id
                                            }]
                                        })
                                        .set('Accept', 'application/json')
                                        .end(function (err, res4) {
                                            if (err) return done(err);
                                            
                                            expect(res4.body.contacts[0].id).to.equal(res3.body.id);
                                            done();

                                        });


                                });
                        });
                });
        });
    });

    describe('DELETE /contact_groups/:id', function () {
        it('responds with 200', function (done) {
            request(app)
                .post(baseUrl + '/contacts')
                .send({
                    "name": "test19",
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
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.id).to.exist;

                    request(app)
                        .post(baseUrl + '/contact_groups')
                        .send({
                            "name": "test_group_1",
                            "contacts": [{
                                "id": res.body.id
                            }]
                        })
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) return done(err);
                            expect(res.body.id).to.exist;

                            request(app)
                                .delete(baseUrl + '/contact_groups/' + res.body.id)
                                .expect(200)
                                .end(function (err, res) {
                                    if (err) return done(err);
                                    done();
                                });
                        });
                });
        });
    });

    describe('GET /contact_groups/:id', function () {
        it('responds with 404 on non existent id', function (done) {
            request(app)
                .get(baseUrl + '/contact_groups/000000000000000000000000')
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('PUT /contact_groups/:id', function () {
        it('responds with 404 on non existent id', function (done) {
            request(app)
                .put(baseUrl + '/contact_groups/000000000000000000000000')
                .send({
                    "name": "test_group_1",
                    "contacts": [{
                        "id": "000000000000000000000000"
                    }]
                })
                .set('Accept', 'application/json')
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('DELETE /contact_groups/:id', function () {
        it('responds with 404 on non existent id', function (done) {
            request(app)
                .delete(baseUrl + '/contact_groups/000000000000000000000000')
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
});
