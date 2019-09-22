const fs = require('fs');
const loki = require('lokijs');

module.exports.formAddNoticia = function(app, req, res){

    fs.readFile('./result.json', 'utf8', function(err, data){
        const db = JSON.parse(data);
        console.log(db);
        res.render('admin/form_add_noticia',{
            validate: '',
            notice: '',
            db
        });
    });
}
module.exports.newsCreate = function(app,req,res){
    let notice = req.body;

    req.assert('titulo','Título é obrigatório').notEmpty();
    req.assert('resumo','Resumo é obrigatório').notEmpty();
    req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10,100);
    req.assert('autor','Autor é obrigatório').notEmpty();
    req.assert('noticia','Notícia é obrigatório').notEmpty();
    req.assert('data_noticia','Data é obrigatório').notEmpty();

    let err = req.validationErrors();

    if(err){
        res.render('admin/form_add_noticia',{
            validate: err,
            notice: notice
        });
        return;
    }

    let connection = app.settings.dbConnection();
    let news = new app.app.models.NewsDAO(connection);

    news.createNews(notice, function(err, result){
        res.redirect('/news');
    });
}