// Models - JogosDAO
const ObjectID = require('mongodb').ObjectId;

function JogosDAO(connection){
    this._connection = connection();
}

JogosDAO.prototype.gerarParametros = function(usuario){
    this._connection.open(function(err, mongoClient){
        mongoClient.collection('jogo', function(err, collection){
            collection.insert({
                usuario:usuario,
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });
            mongoClient.close();
        });
    });
}

JogosDAO.prototype.iniciaJogo = function(usuario, req, res, casa, msg){
    this._connection.open(function(err, mongoClient){
        mongoClient.collection('jogo', function(err, collection){
            collection.find({usuario: usuario}).toArray(function(err, result){
                res.render('jogos', {imgCasa: casa, jogo: result[0], comando: msg});
                mongoClient.close();
            });
        });
    });
}

JogosDAO.prototype.acao = function(acao){
    this._connection.open(function(err, mongoClient){
        mongoClient.collection('acao', function(err, collection){
            const date = new Date();
            let time = null;
            switch(parseInt(acao.acao)){
                case 1: time =  1 * 60 * 60000; break;
                case 2: time =  2 * 60 * 60000; break;
                case 3: time =  5 * 60 * 60000; break;
                case 4: time =  5 * 60 * 60000; break;
            }
            acao.acaoTermina = date.getTime() + time;
            collection.insert(acao);
        });
        mongoClient.collection('jogo', function(err, collection){
            let coins = null;
            switch(parseInt(acao.acao)){
                case 1: coins =  -2 * acao.quantidade; break;
                case 2: coins =  -3 * acao.quantidade; break;
                case 3: coins =  -1 * acao.quantidade; break;
                case 4: coins =  -1 * acao.quantidade; break;
            }
            /**
             * $set: atualiza os valores substituindos-os
             * $inc: incrementa os valores somando-os
             * false: somente o primeiro documento encontrado é atualizado
             * true: todos os documentos encontrado são atualizados
             */
            collection.update({usuario: acao.usuario}, {$inc: {moeda: coins} });
            mongoClient.close();
        });
    });
}

JogosDAO.prototype.getAcoes = function(usuario, res){
    this._connection.open(function(err, mongoClient){
        mongoClient.collection('acao', function(err, collection){
            const date = new Date();
            let currentMoment = date.getTime();
            collection.find({
                usuario: usuario, 
                acaoTermina: {$gt: currentMoment}
            }).toArray(function(err, result){
                res.render('pergaminhos', {acoes: result});
                mongoClient.close();
            });
        });
    });
}

JogosDAO.prototype.revogarAcao = function(_id, res){
    this._connection.open(function(err, mongoClient){
        mongoClient.collection('acao', function(err, collection){
            collection.remove({_id: ObjectID(_id)}, function(err, result){
                res.redirect('/jogos?msg=D');
                mongoClient.close();
            });
        });
    });
}

module.exports = function(){
    return JogosDAO;
}