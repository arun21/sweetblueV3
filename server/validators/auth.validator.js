const validator = require('validator');

const AuthValidators = {
    validateLogin: (req, res, next) => {
        const credentials = req.body
        if (!credentials.email || !validator.isEmail(credentials.email)) {
            res.status(400).json({ message: 'Email address is empty or invalid' });
        }
        else if (!credentials.password) {
            res.status(400).json({ message: 'Password cannot be empty' });
        }
        else {
            next();
        }
    },
    validateEmail: (req, res, next) => {
        if (!req.body.email || !validator.isEmail(req.body.email)) {
            res.status(400).json({ message: 'Email address is empty or invalid' });
        } else {
            next();
        }
    },
    validateResetPassword: (req, res, next) => {
        if (!req.body.newpassword) {
            res.status(400).json({ message: 'Password cannot be empty' });
        } else if (!req.body.userid) {
            res.status(400).json({ message: 'User cannot be empty' });
        }else {
            next();
        }
    }
}

module.exports = AuthValidators;