const express = require('express');
const {Server} = require('socket.io')

const app = express();
// const server = new Server(app);

// const io = new Server(server);

app.get("/",(req,res)=>{
    res.json({message:"started"});
})
app.listen(3000, ()=>{
    console.log("Server is up and running");
})