const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET registration form */
router.get('/register', function(req, res, next) {
    res.render('signup');
})



module.exports = router;