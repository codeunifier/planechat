var express = require('express');
var router = express.Router();

router.get('/hello', (req, res) => {
    res.send({ express: "Hello from my server!" });
});

module.exports = router;