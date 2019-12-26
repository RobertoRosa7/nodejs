// Controllers jogos

module.exports.jogos = function(application, req, res){
    if(req.session.autorizado !== true){res.send('Usuario precisa fazer login'); return; }
    
    let msg = '';
    let usuario = req.session.usuario;
    let casa = req.session.casa;
    const connection = application.config.dbConnection;
    const JogosDAO = new application.app.models.JogosDAO(connection);

    if(req.query.msg != ''){ msg = req.query.msg; }

    JogosDAO.iniciaJogo(usuario, req, res, casa, msg);
}

module.exports.sair = function(application, req, res){
    // session destroy
    req.session.destroy(function(err){ 
        res.render('index', {
            validacao: {},
            comando: '',
            user: ''
        }); 
    });
}

module.exports.suditos = function(application, req, res){
    if(req.session.autorizado !== true){res.send('Usuario precisa fazer login'); return; }

    res.render('aldeoes', {validacao: {}});
}

module.exports.pergaminhos = function(application, req, res){
    if(req.session.autorizado !== true){res.send('Usuario precisa fazer login'); return; }
    
    // recuperar ações do banco de dados
    const connection = application.config.dbConnection;
    const JogosDAO = new application.app.models.JogosDAO(connection);
    let usuario = req.session.usuario;

    JogosDAO.getAcoes(usuario, res);
}

module.exports.ordenarAcaoSudito = function(application, req, res){
    if(req.session.autorizado !== true){res.send('Usuario precisa fazer login'); return; }

    let formData = req.body;

    req.assert('acao', 'Uma ação deve ser passada.').notEmpty();
    req.assert('quantidade', 'Uma quantidade precisa ser indicada').notEmpty();

    let erros = req.validationErrors();

    if(erros){ res.redirect('jogos?msg=E'); return; }

    const connection = application.config.dbConnection;
    const JogosDAO = new application.app.models.JogosDAO(connection);

    formData.usuario = req.session.usuario;
    JogosDAO.acao(formData);
    
    res.redirect('jogos?msg=S');
}

module.exports.revogarAcao = function(application, req, res){
    let _id = req.query.id_acao;

    const connection = application.config.dbConnection;
    const JogosDAO = new application.app.models.JogosDAO(connection);

    JogosDAO.revogarAcao(_id, res);
}