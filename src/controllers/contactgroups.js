const express = require('express');
const contactGroupService = require('../services/contactgroupservice');

const router = express.Router();

router.get('/', async function (req, res) {
    const contactGroups = await contactGroupService.getAllContactsGroups();
    res.send(contactGroups);
});

router.post('/', async function (req, res) {
    const contactGroup = await contactGroupService.addContactGroup(req.body);
    res.send(contactGroup);
});

router.get('/:contactGroupId', async function (req, res) {
    const contactGroup = await contactGroupService.getContactGroup(req.params.contactGroupId);
    res.send(contactGroup);
});

router.put('/:contactGroupId', async function (req, res) {
    const contactGroup = await contactGroupService.updateContactGroup(req.params.contactGroupId, req.body);
    res.send(contactGroup);
});

router.delete('/:contactGroupId', async function (req, res) {
    const deletedInfo = await contactGroupService.deleteContactGroup(req.params.contactGroupId);
    if (deletedInfo.deletedCount == 1) {
        res.status(200).send();
    }
    else {
        res.status(404).send();
    }
});

module.exports = router;