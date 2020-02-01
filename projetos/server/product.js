const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name: String,
    department: [{type: mongoose.Schema.Types.ObjectId, ref: 'Department'}],
    price: Number,
    stock: Number,
}, {versionKey: false});

module.exports = mongoose.model('Product', ProductSchema);