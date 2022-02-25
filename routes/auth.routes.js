const router = require('express').Router();
const { loginForm, loginUser, verifyToken } = require('../controllers/auth.controller');

router.get('/', loginForm);
router.post('/user', loginUser, verifyToken);

module.exports = router;