const mongoose = require('mongoose');
const Contact = require('../models/contact');

function getAllContacts() {
    return Contact.find({}).exec();
}

function addContact(contactData) {
    const contact = new Contact({
        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email    
    });
    return contact.save();
}

module.exports = {
    getAllContacts,
    addContact
};