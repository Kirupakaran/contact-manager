const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: String,
    phone: [{
        number: String,
        tag: String,
        _id: false
    }],
    email: [{
        emailId: String,
        tag: String,
        _id: false
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

contactSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

module.exports = mongoose.model('Contact', contactSchema);