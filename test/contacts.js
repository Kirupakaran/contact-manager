const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Contact = require('../src/models/contact');
const ContactGroup = require('../src/models/contactgroup');

const TEST_DB_CONNECTION_URI = 'TEST_DB_CONNECTION_URI=mongodb://test:test123@ds263436.mlab.com:63436/contacts_test';

const baseUrl = '/api/v1';

before(function(done) {
    mongoose.connect(TEST_DB_CONNECTION_URI, { useNewUrlParser: true }, function (err) {
        if (err) throw err;
      
        console.log('Connected to db server');
        app.listen(9999, () => console.log(`App listening on port 9999!`));
        Contact.deleteMany({});
        ContactGroup.deleteMany({});

        done();
    });
});

describe('test cases', function() {
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

    describe('POST /contacts', function() {
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
                done();
            });
        });
    });

    describe('POST /contacts', function() {
        it('responds with json', function(done) {
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
        it('responds with json', function(done) {
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
});
  
process.on('SIGINT', function() {
    mongoose.disconnect(function () {
        console.log('Mongo disconnected on app termination');
        process.exit(0);
    });
});