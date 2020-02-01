const express = require('express');
const router = express.Router();
const Product = require('./product');

// Routes products
router.post('/', (req, res) => {
    const p = new Product({
        name: req.body.name,
        departments: req.body.departments,
        price: req.body.price,
        stock: req.body.stock,
    });

    p.save((err, prod) => {
        (err) ? res.status(500).send({status: false, error: err}) : res.status(200).send(prod);
    });
});
router.get('/', (req, res) => {
    Product.find().exec((err, prod) => {
        (err) ? res.status(500).send({status: false, error: err}) : res.status(200).send(prod);
    });
});
router.delete('/:id', (req, res) => {
    Product.deleteOne({_id: req.params.id}, (err) => {
        (err) ? res.status(500).send({status: false, error: err}) : res.status(200).send({});
    });
});
router.patch('/:id', (req, res) => {
    Product.findById({_id: req.params.id}, (err, prod) => {
        if(err) res.status(500).send({status: false, error: err})
            else if (!prod) res.status(404).send({})
        else {
            prod.name = req.body.name;
            prod.price = req.body.price;
            prod.departments = req.body.departments;
            prod.stock = req.body.stock;

            prod.save()
                .then(p => res.status(200).send(p))
                .catch(e => res.status(500).send({status: false, error: err}));
        }
    });
});

module.exports = router;