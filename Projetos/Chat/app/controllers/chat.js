module.exports.talk = function(application,req,res){
    
    let dados = req.body;
    
    req.assert('apelido','Nome ou apelido é obrigatório!').notEmpty();
    req.assert('apelido','Nome ou apelido deve conter entre 3 e 15 caracteres').len(3,15);

    let erro = req.validationErrors();

    if(erro){
        res.render('index',{erro});
        return;
    }
    application.get('io').emit('msgParaCliente',{
        apelido: dados.apelido,
        msg:'Acabou de entrar no chat'
    });
    res.render('chat',{dados});
}