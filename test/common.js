require('dotenv').config();
const mongoose = require('mongoose');
const app = require('../src/app');
const Contact = require('../src/models/contact');
const ContactGroup = require('../src/models/contactgroup');

before(function(done) {
    mongoose.connect(process.env.TEST_DB_CONNECTION_URI, { useNewUrlParser: true }, function (err) {
        if (err) throw err;
      
        console.log('Connected to db server');
        app.listen(9999, () => console.log(`App listening on port 9999!`));
        Contact.deleteMany({});
        ContactGroup.deleteMany({});

        done();
    });
});

after(function() {
    mongoose.disconnect(function () {
        console.log('Mongo disconnected on app termination');
        process.exit(0);
    });
});