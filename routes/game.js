/**
 * Created by prism on 5/21/14.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('tic-tac-toe');
});

module.exports = router;