const ProductModel = require('./../models/ProductModel');

// exportando um objeto diretamente - mas poderia exporta separado
module.exports = {
    all: function(req, res){
        // lean() para resultado mais cru com atributos e valoress
        ProductModel.find({}).lean().exec(function(err, product){
            (err) ? res.status(404).send({status: false}) : res.json(product);
        });
    }
}