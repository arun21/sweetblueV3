const mongoose = require('mongoose');
const BaseModel = require('./base-model');


//Tags Schema
const TagsSchema = BaseModel.createSchema({
	name: {
		type: String,
        required: true,
        unique: true
	}
});

module.exports = mongoose.model('Tags', TagsSchema);