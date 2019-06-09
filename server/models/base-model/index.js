const mongoose_delete = require('mongoose-delete');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.createSchema = function (model) {
	const baseSchema = new Schema({
		createdAt: {
			type: Date,
			default: new Date(),
			select: false
		},
		updatedAt: {
			type: Date,
			default: new Date(),
			select: false
		}
	});
	baseSchema.plugin(mongoose_delete, { overrideMethods: true });

	baseSchema.add(model);

	return baseSchema;
}