var http = require('http');

// criando servidor http
var server = http.createServer(function(req,res){
    // recuperando URL
    var categoria = req.url;

    // verificando url e direcionando para rotas a partir da raiz
    if(categoria == '/tecnologia'){
        res.end('<html><head><meta charset="utf-8"></head><body><h1>Página de tecnologia</h1></body></html>');
    }else if(categoria == '/moda'){
        res.end('<html><head><meta charset="utf-8"></head><body><h1>Página de moda</h1></body></html>');
    }else if(categoria == '/beleza'){
        res.end('<html><head><meta charset="utf-8"></head><body><h1>Página de beleza</h1></body></html>');
    }else{
        res.end('<html><head><meta charset="utf-8"></head><body><h1>Página de home</h1></body></html>');
    }
    console.log(categoria);
});
// ouvindo na porta 3000
server.listen(3000);
