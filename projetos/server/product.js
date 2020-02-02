const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name: String,
    departments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Department'}],
    price: Number,
    stock: Number,
}, {versionKey: false});

module.exports = mongoose.model('ProductStore', ProductSchema);