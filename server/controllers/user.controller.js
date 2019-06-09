const config = require('../config');

module.exports = function (userService, emailService) {
    this.userService = userService;
    this.emailService = emailService;

    this.register = async (req, res) => {
        try {
            const newUser = await this.userService.addUser(req.body);
            res.send({
                _id: newUser._id,
                email: newUser.email.emailAddress,
                name: `${newUser.firstName} ${newUser.lastName}`
            });
            // Don't send confirmation email for now
            // this.sendEmailConfirmation(newUser, config.websiteBaseUrl);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err });
        }
    };

    this.getAllTags = async (req, res) => {
        try {
            const tags = await this.userService.getAllTags();
            res.json(tags);
        } catch (err) {
            res.status(500).send({ message: err });
        }
    };

    this.getAllFilters = async (req, res) => {
        try {
            const filters = await this.userService.getAllFilters();
            res.json(filters);
        } catch (err) {
            res.status(500).send({ message: err });
        }
    };

    this.confirmEmail = async (req, res) => {
        try {
            await this.userService.confirmEmail(req.body.ct);
            res.json({ confirmed: true });
        } catch (err) {
            console.log(err);
            const msg = err instanceof Error ? "Unexpected error occurred" : err;
            res.status(500).json({ message: msg });
        }
    };

    this.sendEmailConfirmation = async newUser => {
        let subject = 'Welcome to SweetBlu';
        let emailBody = {
            name: `${newUser.firstName} ${newUser.lastName}`,
            title: subject,
            text1: `This is a confirmation email that your account has been created with SweetBlu. Please click the link given below to confirm this email address.`,
            text2: "Have fun and don't hesitate to contact us for any help",
            hasLink: true,
            link: {
                href: `${config.websiteBaseUrl}/?m=signin&ct=${newUser.email._id}`,
                text: 'Confirm email'
            }
        }

        try {
            await this.emailService.sendEmailWithTemplate(
                newUser.email.emailAddress,
                subject,
                emailBody
            );
        } catch (err) {
            console.log(err);
        }
    };
}