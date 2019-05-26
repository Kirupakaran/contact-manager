const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactGroupSchema = new Schema({
    name: String,
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
});

export default mongoose.model('ContactGroup', contactGroupSchema);