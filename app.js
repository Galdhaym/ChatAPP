var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { v4: uuidv4 } = require('uuid');

const bodyParser = require("body-parser");

app.set("view engine", "hbs");
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);

app.get("/", function(req, res){
    res.render("room.hbs");
});

var messages = {
    joinedStatusMessanges:[],
    otherUserMessanges:[]
};
io.on("connection", function(socket){
    console.log("connect!");
    socket.on("join", function(room){
        console.log("joined!");
        //join user to the chat
        var roomObj = JSON.parse(room)
        socket.join(roomObj.currentRoomID);
        var message = socket.id + " joined to the chat";
        //send joining broadcast message to chat
        roomObj.userMessage = message;
        //send stored messanges to user in room 
        if(messages.joinedStatusMessanges.length > 0 || messages.otherUserMessanges.length > 0){
            socket.emit("load room messages to joined user", JSON.stringify(messages));
        }
        //store messanges in array
        messages.joinedStatusMessanges.push(roomObj.userMessage);
        socket.to(roomObj.currentRoomID).emit("send message to all of chat", JSON.stringify(roomObj));
        socket.emit("send message to all of chat", JSON.stringify(roomObj));
    });
    socket.on("send message", function(room){
        var roomObj = JSON.parse(room);
        //send user broadcast message to chat
        messages.otherUserMessanges.push(roomObj.userMessage);
        socket.to(roomObj.currentRoomID).emit("get message", JSON.stringify(roomObj));
    });

    socket.on("disconnect", function(socket){

    });
});

http.listen(process.env.PORT || 3000);