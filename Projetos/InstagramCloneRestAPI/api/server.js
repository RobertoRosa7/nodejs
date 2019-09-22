const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
const multiparty = require('connect-multiparty');
const fs = require('fs'); // native

const app = express();

// connection on mongodb
const db = new mongodb.Db('instagram', new mongodb.Server('localhost', 27017, {}), {});

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());
app.use((req,res,next)=>{

    //res.setHeader('propriedade', 'valor para atribuir a propriedade');
    res.setHeader('Access-Control-Allow-Origin', '*'); // origem da requisição
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // método get, post, put etc..
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // cabeçalho
    res.setHeader('Access-Control-Allow-Credentials', true); // autorização senha, token etc...

    next();

});

// routes
app.get('/', (req, res, next) =>{
    res.send({msg: 'Ola sua API está funcionando'});
});

// criação de dados
app.post('/api', (req, res, next)=>{
    
    // timestamp to filename
    const date = new Date();
    let timestamp = date.getTime();

    // move file from local to server
    let path_orig = req.files.arquivo.path;
    let filename = timestamp + '_' + req.files.arquivo.name;
    let path_dest = './uploads/' + filename;

    fs.rename(path_orig, path_dest, function(err){
        if(err){
            res.status(500).json({error: err});
            return;
        }

        var dados = {
            url: filename,
            titulo: req.body.titulo
        }

        // insert data on database
        db.open((err, mongoClient) => {
            mongoClient.collection('postagens', (err, collection)=>{
                collection.insert(dados, (err, results)=>{
                    (err) ? res.json({status: err}) : res.json({status: 'sucesso'});
                    mongoClient.close();
                });
            });
        });
    });
});

// consulta geral
app.get('/api', (req, res, next) =>{
    db.open((err, mongoClient) => {
       mongoClient.collection('postagens', (err, collection)=>{
           collection.find().toArray((err, results) =>{
               (err) ? res.send(err) : res.send(results);
               mongoClient.close();
           });
       });
    });
});

// consulta por id
app.get('/api/:id', (req, res, next)=>{
    db.open((err, mongoClient)=>{
        mongoClient.collection('postagens', (err, collection)=>{
            collection.find(ObjectId(req.params.id)).toArray((err, results)=>{
                (err) ? res.send(err) : res.send(results);
                mongoClient.close();
            });
        });
    });
});

// atualização por id
app.put('/api/:id', (req, res, next)=>{
    db.open((err, mongoClient)=>{
        mongoClient.collection('postagens', (err, collection)=>{
            // update({query},{condições},{multi:false or true},function(err, results){});
            // $set: determina qual valor será atualizado - atualizador de conteúdo
            // $inc: incrementa ou decrementa valores
            // $push: incluir novo elemento dentro do array de objetos json
            // $pull: remover um elemento dentro do array, usando update para manter o documento
            collection.update(
                {_id:ObjectId(req.params.id)},
                {$push: {
                    comments: {
                        id_comment: new ObjectId(),
                        comment: req.body.comment
                    }
                 }
                },
                {}, // default - somente um documento será atualizado
                (err, results) => { (err) ? res.send(err) : res.send(results); }
            );
            mongoClient.close();
        });
    });
});

// excluindo dados por id
app.delete('/api/:id', (req,res,next)=>{
    db.open((err, mongoClient)=>{
        mongoClient.collection('postagens', (err, collection)=>{
            collection.update(
                { }, // percorrer todos os objetos
                {$pull: {comments: { id_comment: ObjectId(req.params.id) }}}, // remove comment
                {multi: true}, // remover todos
                (err, results)=>{
                (err) ? res.send(err) : res.send(results);
            });
            mongoClient.close();
        });
    });
});

app.get('/api/imagens/:imagem', (req, res, next)=>{
    let img = req.params.imagem;

    //fs.readFile('onde está o arquivo', function(err, result){});
    fs.readFile(`./uploads/${img}`, (err, content_file)=>{
        if(err){
            res.status(400).json(err);
            return;
        }
        // res.writeHeader(status, json);
        res.writeHeader(200, {'Content-Type' : 'image/jpg'});
        res.end(content_file); // res.end() para binários
    });
});
//listen on port 8080
app.listen(8080, () =>{
    console.log('Server On');
});