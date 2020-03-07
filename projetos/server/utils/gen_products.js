const mongoose = require('mongoose');
const Faker = require('faker');
const ProductModel = require('./../models/ProductModel');

// connection to database
mongoose.connect('mongodb://localhost:27017/namesdb',{ useNewUrlParser: true, useUnifiedTopology: true });

async function add(n){
    try{
        for(let i = 0; i < n; i++){
            const p = new ProductModel();
            p.name = Faker.commerce.productName();
            p.department = Faker.commerce.department();
            p.price = Faker.commerce.price();
    
            await p.save()
        }
    }catch(e){
        console.log(e)
    }
}
add(100)
    .then(() => {
        console.log('products generated success.')
        mongoose.disconnect();
    }).catch(e => console.log(e))