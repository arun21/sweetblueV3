const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolesSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Roles', RolesSchema);