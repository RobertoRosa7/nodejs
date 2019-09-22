// Models DAO - Data Access Object

const crypto = require('crypto');

function UsuariosDAO(connection){
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoClient){
        mongoClient.collection("usuarios", function(err, collection){
            // criptografia de senha
            let passHash = crypto.createHash('md5').update(usuario.senha).digest('hex');
            usuario.senha = passHash;

            collection.insert(usuario);
            mongoClient.close();
        });
    });
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open(function(err, mongoClient){
        mongoClient.collection('usuarios', function(err, collection){
            // criptografia de senha
            let passHash = crypto.createHash('md5').update(usuario.senha).digest('hex');
            usuario.senha = passHash;

            //collection.find({usuario: {$eq: usuario.usuario}, senha: {$eq: usuario.senha}});
            collection.find(usuario).toArray(function(err, result){
                
                if(result[0] != undefined){
                    // iniciando a sessão autorizado e atribuindo valor boolean
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }
                
                if(req.session.autorizado){
                    res.redirect('/jogos');
                }else{
                    res.render('index', {
                        validacao: {},
                        comando: 'erroLogin',
                        user: usuario.usuario
                    });
                }
            });
            mongoClient.close();
        });
    });
}
module.exports = function(){
    return UsuariosDAO;
}