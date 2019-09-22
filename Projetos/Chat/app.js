// importar as configurações do servidor
const app = require('./config/server');

// parametrizar a porta de escuta
const server = app.listen(3000, function(){
    console.log('Server Up');
});

// parametrizar a porta de escuta para socket
const io = require('socket.io').listen(server);

// exportando io para todo projeto
app.set('io', io);

// criando a conexão websocket
io.on('connection', function(socket){
    console.log('Usuário se conectou ao WebSocket');

    // evento desconectar deve ser passado no parâmetro da função de callback como instancia
    // para io
    socket.on('disconnect', function(){
        console.log('Usuário se desconectou do WebSocket');
    });

    socket.on('msgParaServidor', function(data){

        socket.emit('msgParaCliente',{
            apelido: data.apelido,
            msg: data.msg
        });

        // broadcast emite para todos usuários conectados ao websocket
        socket.broadcast.emit('msgParaCliente',{
            apelido: data.apelido,
            msg: data.msg
        });

        // evitar repetições de apelido
        if(parseInt(data.apelidoAtualizado) == 0){
            socket.emit('participantes',{
                apelido: data.apelido,
            });
    
            // broadcast emite para todos usuários conectados ao websocket
            socket.broadcast.emit('participantes',{
                apelido: data.apelido,
            });
        }
    });
});