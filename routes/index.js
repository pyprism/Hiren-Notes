var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('index.html');
});






router.post("/" , function(req,res){
    var email = req.body.email
    pass = req.body.password ;
});
module.exports = router;
