const mongoose = require('mongoose');
const faker = require('faker');
const Person = require('./person');
const Product = require('./product');

mongoose.connect('mongodb://localhost:27017/namesdb',{ useNewUrlParser: true, useUnifiedTopology: true });

async function createRandomPeople(){
    const n = 1000;
    for(let i = 0; i < n; i++){
        let p = new Person({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            city: faker.address.city(),
            country: faker.address.country()
        });
        try{
            await p.save();
        }catch(err){
            throw new Error('error to generate new person');
        }
    }
}
async function createRandomProduct(){
    const n = 100;
    for(let i = 0; i < n; i++){
        let p = new Product({
            name: faker.commerce.productName(),
            department: faker.commerce.department(),
            price: faker.commerce.price()
        });
        try{
            await p.save();
        }catch(err){
            throw new Error('error to generate new products');
        }
    }
}
// createRandomPeople().then((persons) => {
//     mongoose.disconnect();
//     console.log('Success - people generated!');
// });

createRandomProduct().then(products => {
    mongoose.disconnect();
    console.log('Success - products generated!');
});