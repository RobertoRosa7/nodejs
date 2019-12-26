module.exports = function(app){
    
    app.get('/news', function(req, res){
        app.app.controllers.notice.news(app,req,res);
    });

    app.get('/newsletters', function(req, res){
        app.app.controllers.notice.newsLetters(app,req,res);
    });
};