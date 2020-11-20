$(document).ready(function(){
    var socket = io('http://localhost:3000');
    var currentRoomID = "mainRoom";
    var userData = {
        currentRoomID
    };
    socket.emit('join', JSON.stringify(userData));


    socket.on('connection', () => {
        console.log("connect");
    });

    socket.on("load room messages to joined user", (messages) => {
        var messages = JSON.parse(messages);

        messages.joinedStatusMessanges.forEach(function(elem) {
            setJoinMessageValue(elem);
        });

        messages.otherUserMessanges.forEach(function(elem) {
            setAnotherMessageValue(elem);
        });
    });
    
    socket.on('send message to all of chat', (room) => {
        var roomObj = JSON.parse(room);
        setJoinMessageValue(roomObj.userMessage);
    });

    socket.on("get message", (room) => {
        var roomObj = JSON.parse(room);
        setAnotherMessageValue(roomObj.userMessage);
    });

    $(".sendMessage").click(function(){
        var userMessage = $("#userMessage").val();
        if(userMessage === ""){
            return;
        }
        $("#userMessage").val("");
        var room = {
            currentRoomID,
            userMessage
        }
        setMySelfMessageValue(room.userMessage);
        socket.emit("send message", JSON.stringify(room));
    });

    function setMySelfMessageValue(message){
        setMessageValue(message);
        $(".message").last().css("float","right");
    }

    function setJoinMessageValue(message){
        setMessageValue(message);
        $(".message").last().css("margin", "0 auto");
        $(".message").last().css("margin-top", "10px");
    }

    function setAnotherMessageValue(message){
        setMessageValue(message);
        $(".message").last().css("float","left");
    }

    function setMessageValue(message){
        $(".messages").append("<div class = 'message'>");
        var lastMessage = $(".message").last();
        lastMessage.append("<p>"+ message +"</p>");
    }

});