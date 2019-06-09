const mongoose = require('mongoose');
const BaseModel = require('./base-model');


//Filters Schema
const FiltersSchema = BaseModel.createSchema({
	name: {
		type: String,
        required: true,
        unique: true
	}
});

module.exports = mongoose.model('Filters', FiltersSchema);