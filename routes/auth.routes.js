const router = require('express').Router();
const { loginForm } = require('../controllers/auth.controller');

router.get('/', loginForm);


module.exports = router;