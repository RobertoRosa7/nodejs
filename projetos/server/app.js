const mongoose = require('mongoose');
const Person = require('./person');
const Product = require('./product');
const department_controller = require('./department_controller');
const product_controller = require('./product_controller');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const PORT = 8080;
const app = express();
const api = require('./routes/general');
const auth = require('./routes/auth');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// connection to database
mongoose.connect('mongodb://localhost:27017/namesdb',{ useNewUrlParser: true, useUnifiedTopology: true });

app.use('/v1/department', department_controller);
app.use('/v1/products', product_controller);
app.use('/api/v2', api);
app.use('/api/v2/auth', auth);

// routers
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Server is running!'
    });
});

app.get('/products', (req, res) => {
    Product.find({}).lean().exec((err, result) => {
        if(err) res.status(500).json({error: err, message: 'internal error'});
        else res.status(200).json(result);
    });
});

app.get('/products/name/:id', (req, res) => {
    const id = req.params.id;
    Product.findById(id, (err, prods) => {
        if(err) res.status(500).send({error: err, messge: 'internal error'});
        else if(!prods) res.status(404).send()
        else res.status(200).send(prods.name);
    });
});

app.get('/productserr', (req, res) => {
    setTimeout(() => {
        res.status(500).json({
            message: 'Error message from server'
        });
    }, 2000);
});

app.get('/productsdelay', (req, res) => {
    setTimeout(() => {
        Product.find({}).lean().exec((err, result) => {
            if(err) res.status(500).json({error: err, message: 'internal error'});
            else res.status(200).json(result);
        });
    }, 5000);
});

app.get('/products_ids', (req, res) => {
    Product.find({}).lean().exec((err, result) => {
        if(err) res.status(500).json({error: err, message: 'internal error'});
        else res.status(200).json(result.map(p => p._id));
    });
});

app.post('/products', (req, res) => {
    const p = new Product({
        name: req.body.name,
        department: req.body.department,
        price: req.body.price
    });
    p.save((err, prod) => {
        if(err) res.status(500).send({err});
        else res.status(200).send(prod);
    });
});

app.delete('/products/:id', (req, res) => {
    Product.deleteOne({_id: req.params.id}, (err, prod) => {
        if(err) res.status(500).json({ error: err, message: 'internal error'});
        else return res.status(200).json(prod);
    });
});

app.patch('/products/:id', (req, res) => {
    Product.findById({_id: req.params.id}, (err, prod) => {
        if(err) 
            res.status(500).send(err);
        else if(!prod) 
            res.status(404).send({message: 'nenhum produto foi encontrado.'});
        else {
            prod.name = req.body.name;
            prod.price = req.body.price;
            prod.department = req.body.department;
            prod.save((err, val) => {
                if(err)
                    res.status(500).send(err);
                else
                    res.status(200).send(val);
            });
        }
    });
});

app.get('/names', (req, res) => {
    Person.find({}).lean().exec((err, result) => {
        if(err) res.status(500).json({ error: err, message: 'internal error'});
        else return res.status(200).json(result);
    })
});

app.get('/names/:text', (req, res) => {
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
        else setTimeout(() => {return res.status(200).json(result)}, 2000);
    });
});


// router not found
app.use((req, res, next) => {
    return res.status(404).send('Page does not exists!');
});

app.listen(PORT, () => {
    console.log(`Server NodeJS is running, port ${PORT}`)
})
