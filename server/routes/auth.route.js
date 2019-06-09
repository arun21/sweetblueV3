const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const AuthService = require("../services/auth.service");
const EmailService = require("../services/email.service");
const authValidators = require("../validators/auth.validator");


const emailService = new EmailService();
const authService = new AuthService();
const authController = new AuthController(authService, emailService);


// Base url is /auth
router.post('/login', authValidators.validateLogin, authController.login);
router.post('/token/validate', authController.validateToken);
router.post('/password/forgot', authValidators.validateEmail, authController.forgotpassword);
router.post('/password/reset', authValidators.validateResetPassword, authController.resetpassword);

module.exports = router