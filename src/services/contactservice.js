const Contact = require('../models/contact');

function getAllContacts() {
    return Contact.find({}).exec();
}

function getContact(contactId) {
    return Contact.findById(contactId).exec();
}

function addContact(contactData) {
    const contact = new Contact({
        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email    
    });
    return contact.save();
}

function updateContact(contactId, contactData) {
    const contact = new Contact({
        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email    
    });
    return contact.updateOne({ _id: contactId}, contact);
}

function deleteContact(contactId) {
    return Contact.deleteOne({ _id: contactId });
}

function searchContacts(query) {
    // case insensitive regex
    const searchKey = new RegExp(query, 'i');

    // search name or phone number or email id
    return Contact.find({
        $or: [{
            name: searchKey
        }, {
            'phone.number': searchKey
        }, {
            'email.emailId': searchKey
        }]
    }).sort( { createdTime: -1 });
}

module.exports = {
    getAllContacts,
    getContact,
    addContact,
    updateContact,
    deleteContact,
    searchContacts
};