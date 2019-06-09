const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.controller");
const UserService = require("../services/user.service");
const authMiddleware = require("../middleware/auth.middleware");
const EmailService = require('../services/email.service');
const userValidators = require('../validators/user.validator');


const userService = new UserService();
const emailService = new EmailService();
const userController = new UserController(userService, emailService);

// Base url is /user

router.post('/register', userValidators.validateNewUser, userController.register);
router.post('/email/confirm', userController.confirmEmail);
router.get('/tags', userController.getAllTags);
router.get('/filters', userController.getAllFilters);

// Routes with auth

module.exports = router