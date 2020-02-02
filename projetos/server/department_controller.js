const express = require('express');
const router = express.Router();
const Department = require('./department');
const Product = require('./product');

// routes
router.post('/', (req, res) => {
    const d = new Department({ name: req.body.name});
    d.save((err, dep) => {
        (err) ? res.status(500).send(err) : res.status(200).send(dep);
    });
});
router.get('/', (req, res) => {
    Department.find().exec((err, deps) => {
        (err) ? res.status(500).send(err) : res.status(200).send(deps);
    });
});
// Sem Async
// router.delete('/:id',(req, res) => {
//     const id = req.params.id;
//     Department.deleteOne({_id: id}, (err) => {
//         (err) ? res.status(500).send({status: false, error: err}): res.status(200).send({});
//     });
// });

// Com Async
router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const prods = await Product.find({departments: id}).exec();
        if(prods.length > 0){
            res.status(500).send({
                status: false, msg: 'Could not remove this department, you have to fix its depencies before.'
            })
        }else{
            // const err = Department.deleteOne({_id: id}).exec();
            // (err) ? res.status(500).send({status: false, error: err}) : res.status(200).send({status: true, msg: 'department removido com sucesso.'})
            await Department.deleteOne({_id: id});
            res.status(200).send({status: true, msg: 'department removed successfuly'})
        }
    }catch(err){
        res.status(500).send({status: false, error: err});
    }
})
router.patch('/:id', (req, res) => {
    Department.findById(req.params.id, (err, dep) => {
        if(err) res.status(500).send({status: false, error: err})
            else if(!dep) res.status(404).send({})
        else {
            dep.name = req.body.name;
            dep.save()
                .then(d => res.status(200).send(d))
                .catch(e => res.status(500).send({status: false, error: e}));
        }
    });
});
module.exports = router;