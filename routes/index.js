const express = require('express');
const router = express.Router();
const path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/A', function(req, res) {
    res.sendFile(path.join(__dirname+'/../views/A.html'))
});

router.get('/B', function(req, res) {
    res.sendFile(path.join(__dirname+'/../views/B.html'))
});

module.exports = router;
