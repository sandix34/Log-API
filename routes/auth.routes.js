const router = require('express').Router();
const { loginForm, loginUser } = require('../controllers/auth.controller');

router.get('/', loginForm);
router.post('/user', loginUser);


module.exports = router;