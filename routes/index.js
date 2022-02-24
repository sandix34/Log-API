const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});


router.use('/register', userRoutes);

module.exports = router;