const ContactGroup = require('../models/contactgroup');

function getAllContactsGroups() {
    return ContactGroup.find({}).populate('contacts').exec();
}

function getContactGroup(ContactGroupId) {
    return ContactGroup.findById(ContactGroupId).populate('contacts').exec();
}

function addContactGroup(contactGroupData) {
    // replace id with _id for mongoose
    const contactGroup = new ContactGroup({
        name: contactGroupData.name,
        contacts: contactGroupData.contacts.map(c => {
                c._id = c.id;
                delete c.id;
                return c;
        })
    }); 

    return contactGroup.save();
}

function updateContactGroup(contactGroupId, contactGroupData) {
    // replace id with _id for mongoose
    contactGroupData._id = contactGroupData.id;
    delete contactGroupData.id;

    contactGroupData.contacts.forEach(c => {
        c._id = c.id;
        delete c.id;
    });

    return contactGroup.updateOne({ _id: contactGroupId}, ContactGroup);
}

function deleteContactGroup(ContactGroupId) {
    return ContactGroup.deleteOne({ _id: ContactGroupId });
}

module.exports = {
    getAllContactsGroups,
    getContactGroup,
    addContactGroup,
    updateContactGroup,
    deleteContactGroup
};