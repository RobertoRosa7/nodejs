module.exports = function(app){
    
    // recuperando requisição get
    app.get('/', function(req,res){
        app.app.controllers.home.index(app,req,res);
    });
};