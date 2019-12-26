const mongoose = require('mongoose');
const faker = require('faker');
const Person = require('./person');

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
createRandomPeople().then((persons) => {
    mongoose.disconnect();
    console.log('ok')
});