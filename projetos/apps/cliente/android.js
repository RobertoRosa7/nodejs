const http = require('http');

const bufferResponse = [];
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'get',
    headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/x-www-form-urlencoded'
    }
}
// Content-Type
let html = 'chave=value'; // application/x-www-form-urlencoded
let json = {chave : 'value'}; // application/json - objeto literal
let stringJSON = JSON.stringify(json);

// method to get request via get
let req = http.request(options, res =>{
    // res.on('data', function(buffer){}) retorna pedaços de dados recebido do servidor - precisa converter
    // res.on('end',function(){}) retorna todo o conteúdo enviado pelo servidor
    // res.on('erro',function(){}) retorna possíveis erros de dados

    res.on('data', buffer => {
        bufferResponse.push(buffer);
    });

    res.on('end', () =>{
        let body = Buffer.concat(bufferResponse).toString();
        console.log(body);
        console.log(res.statusCode); // verificar status code da requisição
    });
});
// req.write(stringJSON);
req.end();

// method to get request via get
// http.get('https://movies-v2.api-fetch.website/movies/100', res =>{
//     // res.on('data', function(buffer){}) retorna pedaços de dados recebido do servidor - precisa converter
//     // res.on('end',function(){}) retorna todo o conteúdo enviado pelo servidor
//     // res.on('erro',function(){}) retorna possíveis erros de dados

//     res.on('data', buffer => {
//         bufferResponse.push(buffer);
//     });

//     res.on('end', () =>{
//         let body = Buffer.concat(bufferResponse).toString();
//         console.log(body);
//     });
// });