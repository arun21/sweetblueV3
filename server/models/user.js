const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require('./base-model');
const HashHelper = require('../helpers/hash.helper');

const EmailSchema = new Schema({
	emailAddress: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	isConfirmed: {
		type: Boolean,
		default: false
	}
});

const cartSchema = new Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	quantity: Number
});

//User Schema
const UserSchema = BaseModel.createSchema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: EmailSchema,
	phoneNumber: {
		type: Number
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Roles"
	},
	favourites: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	}],
	cart: [cartSchema],
	tags: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tags'
	}],
	filters: [{
		id: { type: mongoose.Schema.Types.ObjectId, ref: 'Filters' },
		order: { type: Number, default: 0 }
	}]
});

module.exports = mongoose.model('User', UserSchema);

//Adding user to Database
module.exports.addUser = async newUser => {
	try {
		const hash = await HashHelper.hashString(newUser.password);
		newUser.password = hash;
		return await newUser.save();
	}
	catch (err) {
		console.log(err);
		// Log error
		if (err.code == 11000) {
			throw 'This email already exists in our database.';
		} else {
			throw 'Error occurred while saving new user.';
		}
	}
}

//Comparing Password with hashed password
module.exports.comparePassword = async (candiatePassword, hash) => {
	return await HashHelper.compareHash(candiatePassword, hash);
};