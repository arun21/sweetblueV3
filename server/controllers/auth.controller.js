const config = require('../config');

function parseNumericDate(numeric) {
  const d = new Date(0);
  d.setUTCSeconds(numeric);
  return d;
}

module.exports = function (authService, emailService) {
  this.authService = authService;
  this.emailService = emailService;

  this.login = async (req, res) => {
    try {
      const [user, token] = await this.authService.login(req.body);
      const expiresIn = new Date();
      expiresIn.setUTCHours(expiresIn.getUTCHours() + parseInt(config.jwtOptions.expiresInHours));

      res.json({
        token: {
          jwt: token,
          expires: expiresIn.toISOString()
        },
        user: {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email.emailAddress
        }
      });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: err });
    }
  };

  this.sendForgotPasswordEmail = async (user, baseUrl) => {
    let subject = "Reset your password";
    let emailBody = {
      name: `${user.firstName} ${user.lastName}`,
      title: subject,
      text1: `This is an email for resetting your password. Please click the link given below to reset your password.`,
      hasLink: true,
      link: {
        href: `http://${baseUrl}/resetpassword?ct=${
          user.email._id
          }`,
        text: "Reset Password"
      }
    };

    try {
      await this.emailService.sendEmailWithTemplate(
        user.email.emailAddress,
        subject,
        emailBody
      );
    } catch (err) {
      console.log(err);
    }
  };

  this.forgotpassword = async (req, res) => {
    try {
      const baseUrl = req.headers.host;
      const user = await this.authService.forgotPassword(req.body.email);
      this.sendForgotPasswordEmail(user, baseUrl);
      res.json({ emailsend: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  };

  this.resetpassword = async (req, res) => {
    try {
      await this.authService.resetPassword(req.body);
      res.json({ resetpassword: true });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

  this.validateToken = async (req, res) => {
    try {
      const authResponse = await this.authService.validateToken(req.body.token);

      res.json({
        id: authResponse.id,
        email: authResponse.email,
        role: authResponse.role,
        issuedAt: parseNumericDate(authResponse.iat).toISOString(),
        expires: parseNumericDate(authResponse.exp).toISOString()
      });
    } catch (err) {
      res.status(401).json({ message: err });
    }
  }
};
