const ContactGroup = require('../models/contactgroup');

function getAllContactsGroups() {
    return ContactGroup.find({}).populate('contacts').exec();
}

function getContactGroup(ContactGroupId) {
    return ContactGroup.findById(ContactGroupId).populate('contacts').exec();
}

function addContactGroup(contactGroupData) {
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

function updateContactGroup(ContactGroupId, contactGroupData) {
    const contactGroup = new ContactGroup({
        name: contactGroupData.name,
        contacts: contactGroupData.contacts.map(c => {
                c._id = c.id;
                delete c.id;
                return c;
        })
    });
    return contactGroup.updateOne({ _id: ContactGroupId}, ContactGroup);
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