module.exports.news = function(app, req, res){

    let connection = app.settings.dbConnection();
    let news = new app.app.models.NewsDAO(connection);
    
    news.readNews(function(err, result){
        res.render('news/index',{data:result});
    });
}
module.exports.newsLetters = function(app,req,res){
    
    let connection = app.settings.dbConnection();
    let news = new app.app.models.NewsDAO(connection);
    let id = req.query.read;
    
    news.readNewsLetters(id, function(err, result){
        res.render('news/newsletters',{
            data:result,
            url: id
        });
    });
}