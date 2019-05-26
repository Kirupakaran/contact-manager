const express = require('express');
const router = express.Router();
const contactService = require('../services/contactservice');

router.get('/', function (req, res) {
    const contacts = contactService.getAllContacts();
    res.send(contacts);
});

router.get('/:contactId', function (req, res) {
    res.send();
});

router.post('/', function (req, res) {
    res.send();
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