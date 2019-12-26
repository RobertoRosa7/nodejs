module.exports = function(application){
    
    application.get('/chat', function(req,res){
        application.app.controllers.chat.talk(application,req,res);
    });

    application.post('/chat', function(req,res){
        application.app.controllers.chat.talk(application,req,res);
    });

}