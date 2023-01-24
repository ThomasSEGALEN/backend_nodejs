const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const agentSchema = mongoose.Schema({
    numAgent: { type: Number, required: true, unique: true },
    grade: { type: String, required: true },
    password: { type: String, required: true },
});

agentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Agent', agentSchema);
