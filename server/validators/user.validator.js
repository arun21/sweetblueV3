const validator = require('validator');

module.exports = {
    validateNewUser: (req, res, next) => {
        const newUser = req.body;
        if (!newUser.emailAddress || !validator.isEmail(newUser.emailAddress)) {
            res.status(400).json({ message: 'Email address is empty or invalid'});
        }
        else if (!newUser.firstName || !newUser.lastName) {
            res.status(400).json({ message: 'First or last name cannot be empty'});
        }
        else if (!newUser.phoneNumber) {
            res.status(400).json({ message: 'Phone number cannot be empty'});
        }
        else {
            next();
        }
    }
}