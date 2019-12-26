const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var personSchema = Schema({
    firstname: String,
    lastname: String,
    email: String,
    city: String,
    country: String,
});

module.exports = mongoose.model('person', personSchema);