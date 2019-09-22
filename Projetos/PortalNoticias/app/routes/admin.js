module.exports = function(app){

    app.get('/form-add-noticia', function(req,res){
        app.app.controllers.admin.formAddNoticia(app, req, res);
    });
    
    app.post('/news/create', function(req,res){
        app.app.controllers.admin.newsCreate(app, req, res);
    });
};