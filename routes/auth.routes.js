const {
  login,
  register,
  forgotPassword,
} = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/signin', login);
router.post('/signup', register);
router.post('/forgotPassword', forgotPassword);

module.exports = router;
