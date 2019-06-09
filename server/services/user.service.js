const User = require('../models/user');
const Tags = require('../models/tags');
const Filters = require('../models/filters');
const Roles = require('../models/roles');

module.exports = function () {

    this.addUser = async user => {
        const role = await Roles.findOne({ name: 'customer' });
        const newUser = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            email: {
                emailAddress: user.emailAddress
            },
            password: user.password,
            phoneNumber: user.phoneNumber,
            role: role._id,
            tags: user.tags || [],
            filters: user.filters || []
        });

        return await User.addUser(newUser);
    };

    this.confirmEmail = async ct => {
        const user = await User.findOne({ "email._id": ct });
        if (user.email.isConfirmed) {
            throw "Email address already verified.";
        } else {
            user.email.isConfirmed = true;
            return user.save();
        }
    };

    this.getUserByEmail_id = async email_id => {
        return await User.findOne({ 'email._id': email_id });
    }

    this.getAllTags = async () => {
        try {
            return await Tags.find({}, { name: 1, _id: 1 });
        } catch (e) {
            console.log('Get tags error', e);
            throw 'Unexpected error occurred while getting  tags';
        }
    }

    this.getAllFilters = async () => {
        try {
            return await Filters.find({}, { name: 1, _id: 1 });
        } catch (e) {
            console.log('Get filters error', e);
            throw 'Unexpected error occurred while getting  filters';
        }
    }
}