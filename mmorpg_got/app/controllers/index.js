// Controllers index

module.exports.index = function(application, req, res){
    res.render('index', {
        validacao: {},
        comando: {},
        user: ''
    });
}

module.exports.autenticar = function(application, req, res){
    let formData = req.body;
    let msg = '';
    if(req.query.msg != '') { msg = req.query.msg; }

    req.assert('usuario', 'O campo usuário é obrigatório').notEmpty();
    req.assert('senha', 'O campo senha é obrigatório').notEmpty();

    let erros = req.validationErrors();

    if(erros){
        res.render('index', {
            validacao: erros,
            comando: msg,
            user: formData.usuario 
        });

        return; 
    }

    const connection = application.config.dbConnection;
    const UsuarioDAO = new application.app.models.UsuariosDAO(connection);

    UsuarioDAO.autenticar(formData, req, res, msg);
}