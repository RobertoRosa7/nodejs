module.exports.index = function(app,req,res){
    
    let connection = app.settings.dbConnection();
    let news = new app.app.models.NewsDAO(connection);

    news.lastNews(function(err, result){
        res.render('home/index',{
            data: result
        });
    });
}