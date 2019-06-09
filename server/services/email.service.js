var config = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.email.apikey);
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');


module.exports = function () {
    this.sendEmail = (to, subject, message) => {
        const mail = {
            to: to,
            from: config.email.senderEmailaddress,
            subject: subject,
            text: message
        }

        return sgMail.send(mail);
    }

    this.sendEmailWithHtml = (to, subject, html) => {
        const mail = {
            to: to,
            from: config.email.senderEmailaddress,
            subject: subject,
            html: html
        }

        return sgMail.send(mail);
    }

    this.sendEmailWithTemplate = (to, subject, emailBody) => {
        let filename = path.resolve(__dirname, "../templates/email.template.ejs");
        fs.readFile(filename, 'utf-8', (err, template) => {
            if (!err) {
                let html = ejs.render(template, { data: emailBody, websiteUrl: config.websiteBaseUrl });
                return this.sendEmailWithHtml(to, subject, html);
            }
            else {
                console.log(err);
            }
        });
    }

}



