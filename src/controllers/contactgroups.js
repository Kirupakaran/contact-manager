var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send();
});

router.get('/:contactGroupId', function (req, res) {
    res.send();
});

router.post('/', function (req, res) {
    res.send();
});

router.put('/:contactGroupId', function (req, res) {
    res.send();
});

router.delete('/:contactGroupId', function (req, res) {
    res.send();
});

module.exports = router;