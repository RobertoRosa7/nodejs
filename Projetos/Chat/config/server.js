// importações de módulos
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// inicializar o módulo express
const app = express();

// configuração das variáveis view engine e view do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

// configuração dos middlewares
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());

// configuração do consign para autoload
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

// exportar módulo express como variável
module.exports = app;