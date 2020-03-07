const mongoose = require('mongoose');
const Faker = require('faker');
const PersonModel = require('./../models/PersonModel');

// connection to database
mongoose.connect('mongodb://localhost:27017/namesdb',{ useNewUrlParser: true, useUnifiedTopology: true });

async function add(n){
    try{
        for(let i = 0; i < n; i++){
            const p = new PersonModel();
            p.name = Faker.name.firstName();
            p.country = Faker.address.country();
            p.email = Faker.internet.email();
            p.company = Faker.company.companyName();
    
            await p.save()
        }
    }catch(e){
        console.log(e)
    }
}
add(100)
    .then(() => {
        console.log('people generated success.')
        mongoose.disconnect();
    }).catch(e => console.log(e))