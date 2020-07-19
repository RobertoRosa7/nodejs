const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const Product = require('../models/product');

router.get('/products', (req, res) => {
    Product.find({}).lean().exec((err, result) => {
        if(err) res.status(500).json({error: err, message: 'internal error'});
        else res.status(200).json(result);
    });
});

router.get('/products/name/:id', (req, res) => {
    const id = req.params.id;
    Product.findById(id, (err, prods) => {
        if(err) res.status(500).send({error: err, messge: 'internal error'});
        else if(!prods) res.status(404).send()
        else res.status(200).send(prods.name);
    });
});

router.get('/productserr', (req, res) => {
    setTimeout(() => {
        res.status(500).json({
            message: 'Error message from server'
        });
    }, 2000);
});

router.get('/productsdelay', (req, res) => {
    setTimeout(() => {
        Product.find({}).lean().exec((err, result) => {
            if(err) res.status(500).json({error: err, message: 'internal error'});
            else res.status(200).json(result);
        });
    }, 5000);
});

router.get('/products_ids', (req, res) => {
    Product.find({}).lean().exec((err, result) => {
        if(err) res.status(500).json({error: err, message: 'internal error'});
        else res.status(200).json(result.map(p => p._id));
    });
});

router.post('/products', (req, res) => {
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

router.delete('/products/:id', (req, res) => {
    Product.deleteOne({_id: req.params.id}, (err, prod) => {
        if(err) res.status(500).json({ error: err, message: 'internal error'});
        else return res.status(200).json(prod);
    });
});

router.patch('/products/:id', (req, res) => {
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

router.get('/names', (req, res) => {
    Person.find({}).lean().exec((err, result) => {
        if(err) res.status(500).json({ error: err, message: 'internal error'});
        else return res.status(200).json(result);
    })
});

router.get('/names/:text', (req, res) => {
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

module.exports = router;