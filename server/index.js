const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

const app = express();
const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin: 'http://localhost:5173',
        methods: ['GET','POST'],
        credentials: true
    }
});

app.get("/",(req,res)=>{
    res.json({message:"started"});
});

io.on('connection',(socket)=>{
    console.log("user connected", socket.id);
    // socket.emit('welcome',`Hey welcome to server!! ${socket.id}`);
    // socket.broadcast.emit('welcome',`${socket.id} joined the server!`)
    socket.on('message',(data)=>{
        socket.broadcast.emit('receive-message',data)
    });


    socket.on('disconnect',()=>{
        console.log("User disconnected", socket.id);
    });

});

server.listen(3000, ()=>{
    console.log("Server is up and running");
})