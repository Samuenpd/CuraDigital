const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { limiteLogin } = require('../middlewares/rateLimiter');

router.post('/registrar', authController.registrar);
router.post('/login', limiteLogin, authController.login);

module.exports = router;
