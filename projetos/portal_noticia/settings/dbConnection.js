const mysql = require('mysql');

const connMysql = function(){
   // connection to MySQL
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'123765',
        database:'portal_noticias'
    });
}
module.exports = function(){
    return connMysql;
}