const { login, register } = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/signin', login);
router.post('/signup', register);

module.exports = router;
