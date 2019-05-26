var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send();
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