const express = require('express')
const path = require('path')
const socketio= require('socket.io')
const http = require('http')
const {generateMessages}= require('./utils/messages.js')
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users.js')

const publicPath = path.join(__dirname,'../public')

app= express()
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketio(server);
// app.get('/chat', async (req,res)=>{
//     res.send('<h1>Welcome to Chat App </h1>')
// })

// SERVER
io.on('connection',(socket)=>{
    
    socket.emit('display',generateMessages("Welcome!","Admin"),()=>{    })
    //socket.broadcast.emit('display',generateMessages('New User Joined'),()=>{})

    socket.on('message',(val,callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('display',generateMessages(val,user.username),()=>{
            console.log("Msg Sent to Client")
        });
        callback;
    })

    socket.on('join',({username, room}, callback)=>{
        const { error, user } = addUser({id: socket.id, username, room})
        if(error){
            console.log('error in socket.on')
            return callback(error);
        }
        console.log(user)
        socket.join(user.room);
        //socket.to(user.room).emit('display',generateMessages('Welcome !'), ()=>{ })
        socket.broadcast.to(user.room).emit('display',generateMessages(`${user.username} joined !`,"Admin"),()=>{})
        io.to(user.room).emit('room_data', {room:user.room , users : getUsersInRoom(user.room)});
        callback()
    })
    socket.on('sendLocation',(msg,callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage',generateMessages(msg,user.username),()=>{});
        callback;
    })

    socket.on('disconnect',()=>{
        const user= removeUser(socket.id)
        //console.log("disconnect socket id "+ socket.id)
        //console.log(user+ '   removed')
        if(user){
            io.to(user.room).emit('display',generateMessages(`${user.username} left !`,"Admin"),()=>{})
            io.to(user.room).emit('room_data', {room:user.room , users : getUsersInRoom(user.room)});
        }
    })
})

server.listen(3000,()=>{
    console.log("App started Running On Port:3000")
})