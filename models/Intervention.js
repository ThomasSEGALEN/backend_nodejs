const mongoose = require('mongoose');

const interventionSchema = mongoose.Schema({
    motif: { type: String, required: true },
    lieu: { type: String },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('Intervention', interventionSchema);
