const express = require('express');
const router = express.Router();
const contactService = require('../services/contactservice');

router.get('/', async function (req, res) {
    const contacts = await contactService.getAllContacts();
    res.send(contacts);
});

router.get('/search', async function (req, res) {
    const contacts = await contactService.searchContacts(req.query.query);
    res.send(contacts);
});

router.post('/', async function (req, res) {
    const savedContact = await contactService.addContact(req.body);
    res.send(savedContact);
});

router.get('/:contactId', async function (req, res) {
    const contact = await contactService.getContact(req.params.contactId);
    if (!contact) {
        res.status(404).send();
    } else {
        res.send(contact);
    }
});

router.put('/:contactId', async function (req, res) {
    const updatedInfo = await contactService.updateContact(req.params.contactId, req.body);

    if (updatedInfo.n == 1) {
        res.send(req.body);
    } else {
        res.status(404).send();
    }
});

router.delete('/:contactId', async function (req, res) {
    const deletedInfo = await contactService.deleteContact(req.params.contactId);
    if (deletedInfo.deletedCount == 1) {
        res.status(200).send();
    }
    else {
        res.status(404).send();
    }
});

module.exports = router;