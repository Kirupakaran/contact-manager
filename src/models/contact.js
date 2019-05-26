const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: String,
    phone: [{
        number: String,
        tag: String
    }],
    email: [{
        mailId: String,
        tag: String
    }],
    createdTime: {
        type: Date,
        default: Date.now
    },
    lastModifiedTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);