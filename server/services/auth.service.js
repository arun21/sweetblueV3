const User = require("../models/user");
const HashHelper = require('../helpers/hash.helper');
const TokenHelper = require('../helpers/token.helper');

module.exports = function () {

  this.resetPassword = async user => {
    const existingUser = await User.findOne({ "email._id": user.userid });
    if (!user) {
      throw "User does not exist.";
    } else {
      const hash = await HashHelper.hashString(user.newpassword);
      existingUser.password = hash;
      return existingUser.save();
    }
  };

  this.forgotPassword = async email => {
    const user = await User.findOne({ "email.emailAddress": email });
    if (!user) {
      throw "User does not exist";
    } else {
      return user;
    }
  };

  this.validateToken = async (token) => {
    try {
      return await TokenHelper.verify(token);
    } catch (err) {
      console.log('Token validation error', err);
      throw err.message ? err.message : 'Token validation failed.';
    }
  }

  this.login = async credentials => {
    try {
      const user = await User.findOne({
        "email.emailAddress": credentials.email
      })
        .select("+password")
        .populate('role', 'name');

      if (!user) {
        throw "Email address not found.";
      }
      let isMatch = await User.comparePassword(credentials.password, user.password);

      if (isMatch) {
        return await this.createJwtForUser(user);
      } else {
        throw "Wrong Password";
      }
    } catch (err) {
      console.log('Login error', err);
      throw (typeof err !== "error") ? err : "Unexpected error occurred";
    }
  };

  this.createJwtForUser = async (user) => {
    const payload = {
      id: user._id,
      email: user.email.emailAddress,
      role: user.role.name
    }

    return await Promise.all([user, TokenHelper.createToken(payload)]);
  }
};
