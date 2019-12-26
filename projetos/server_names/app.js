const mongoose = require('mongoose');
const Person = require('./person');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const PORT = 8080;
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// connection to database
mongoose.connect('mongodb://localhost:27017/namesdb',{ useNewUrlParser: true, useUnifiedTopology: true });

// routers
app.get('/', (req, res) => {
    Person.find({}).lean().exec((err, result) => {
        if(err) res.status(500).json({ error: err, message: 'internal error'});
        else return res.status(200).json(result);
    })
});

app.get('/:text', (req, res) => {
    const text = req.params.text;
    const query = {
        $or:[
            {firstname: { $regex: text, $options: 'i'}},
            {lastname: { $regex: text, $options: 'i'}},
            {email: { $regex: text, $options: 'i'}},
            {country: { $regex: text, $options: 'i'}},
            {city: { $regex: text, $options: 'i'}},
        ]
    }
    Person.find(query).lean().exec((err, result) => {
        if(err) res.status(500).json({error: err, message: 'internal server'});
        else return res.status(200).json(result);
    });
});

// router not found
app.use((req, res, next) => {
    return res.status(404).send('Page does not exists!');
});

app.listen(PORT, () => {
    console.log(`Server NodeJS is running, port ${PORT}`)
})
