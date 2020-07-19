const mongoose = require('mongoose');
const Person = require('./models/person');
const Product = require('./models/product');
const department_controller = require('./controllers/department_controller');
const product_controller = require('./controllers/product_controller');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const PORT = 8080;
const app = express();
const routesGeneral = require('./routes/general');
const auth = require('./routes/auth');
const http = require('http').Server(app);
const io = require('socket.io')(http);

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// connection to database
mongoose.connect('mongodb://localhost:27017/namesdb',{ useNewUrlParser: true, useUnifiedTopology: true });

app.use('/v1/department', department_controller);
app.use('/v1/products', product_controller);
app.use('/api/v2/auth', auth);
app.use('/api/v2', routesGeneral);

// routers
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Server is running!'
    });
});

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

// router not found
app.use((req, res, next) => {
    return res.status(404).send('Page does not exists!');
});

// app.listen(PORT, () => {
//     console.log(`Server NodeJS is running, port ${PORT}`)
// });

http.listen(PORT, () => {
    console.log(`Server NodeJS is running, port ${PORT}`);
});