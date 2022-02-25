const router = require('express').Router();
const { registrationForm, userCreate } = require('../controllers/user.controller');

router.get('/', registrationForm);
router.post('/user', userCreate);

module.exports = router;