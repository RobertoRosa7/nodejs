const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Department = Schema({
    name: String,
}, {versionKey: false});

module.exports = mongoose.model('Department', Department);