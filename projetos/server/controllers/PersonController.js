const PersonModel = require('./../models/PersonModel');

// exportando um objeto diretamente - mas poderia exporta separado
module.exports = {
    all: function(req, res){
        // lean() para resultado mais cru com atributos e valoress
        PersonModel.find({}).lean().exec(function(err, person){
            (err) ? res.status(404).send({status: false}) : res.json(person);
        });
    }
}