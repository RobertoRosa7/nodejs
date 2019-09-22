// importar o módulo do banco de dados MongoDB
const mongo = require('mongodb');

// método wrapper de conexão, encapsula a função dentro da var e exporta
const connMongoDB = function(){
    const db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost', // string com endereço do servidor
            27017, // porta padrão para conexão
            {} // objeto para configuração do servidor mongodb deve ser vazio
        ),
        {} // configurações adicionais do objeto db
    );
    return db;
}
module.exports = function(){
    return connMongoDB;
}