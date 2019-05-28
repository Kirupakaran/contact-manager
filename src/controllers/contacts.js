const express = require('express');
const router = express.Router();
const contactService = require('../services/contactservice');

router.get('/', async function (req, res) {
    const contacts = await contactService.getAllContacts();
    res.send(contacts);
});

router.get('/:contactId', function (req, res) {
    res.send();
});

router.post('/', async function (req, res) {
    const savedContact = await contactService.addContact(req.body);
    res.send(savedContact);
});

router.put('/:contactId', function (req, res) {
    res.send();
});

router.delete('/:contactId', function (req, res) {
    res.send();
});

router.get('/search', function (req, res) {

});

module.exports = router;