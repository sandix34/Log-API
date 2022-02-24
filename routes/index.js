const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const authRoute = require('./auth.routes');
const usersRoute = require('./users.routes')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.use('/register', userRoutes);
router.use('/login', authRoute);
router.use('/users', usersRoute);

module.exports = router;