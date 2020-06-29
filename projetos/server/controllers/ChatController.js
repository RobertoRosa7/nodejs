const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

module.exports = {
    connection: function(req, res){
        io.on('connection', (socket) => {
            socket.on('messages', (msg) => {
                console.log(msg);
                io.emit('messages', msg);
            });
        
            // enviando mensagem para apenas um usuário
            // let sub = setInterval(() => {
            //     io.to(socket.id).emit('messages', {from: 'Server', message:'This is a bot'});
            // }, 2000)
        
            socket.on('disconnect', () => {
                console.log(`Socket ${socket.id} has just disconnected`);
            });
        
            console.log(`Socket ${socket.id} has just connected`);
        });
        res.status(200).json({msg:'connection success'});
    }
}