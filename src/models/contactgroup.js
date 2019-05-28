const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactGroupSchema = new Schema({
    name: String,
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
});

contactGroupSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

module.exports = mongoose.model('ContactGroup', contactGroupSchema);