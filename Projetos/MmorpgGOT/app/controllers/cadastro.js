// exportando a propriedade cadastro e encapsulando uma função
module.exports.cadastro = function(application, req, res){
    res.render('cadastro', {
        validacao: {},
        formData: {}
    });
};

module.exports.cadastrar = function(application,req,res){
    let formData = req.body;
    
    req.assert('nome', 'O campo nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'O campo usuario não pode ser vazio').notEmpty();
    req.assert('senha', 'O campo senha não pode ser vazio').notEmpty();
    req.assert('casa', 'O campo casa não pode ser vazio').notEmpty();

    let erros = req.validationErrors();

    if(erros){
        res.render('cadastro', {
            validacao: erros,
            formData: formData
        });
        return;
    }
    
    const connection = application.config.dbConnection;
    const UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    const JogosDAO = new application.app.models.JogosDAO(connection);

    UsuariosDAO.inserirUsuario(formData);
    JogosDAO.gerarParametros(formData.usuario);

    res.redirect('/cadastro?msg=success');
}