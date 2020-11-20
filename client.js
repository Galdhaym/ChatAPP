// $(document).ready(function(){
//     var socket = io('http://localhost:3000');
//     var roomsList = new Map();

//     socket.on('connection', () => {
//         console.log("connect");
//     });
    
//     function joinToTheChat(){
//         var parent = this.parent();
//         var chatName = parent.find();
//         var roomID = roomsList.get(chatName);
//         socket.emit("join", JSON.stringify({roomID}));
//     }

//     $("#createChatBut").click(function(){
//         function createChatRoom(){
//             var chatName = $("#chatNameField").val();

//             if(chatName == ""){
//                 console.log("chatName is empty!");
//             }
//             else{
//                 var roomID = Math.random();
//                 var jsonFormData = {
//                     chatName,
//                     roomID
//                 };

//                 $(".exists__chats").add("div").addClass("room:" + jsonFormData.chatName);
//                 $("room:" + jsonFormData.chatName).add("p").val("Chat name: " + jsonFormData.chatName + " id: " + jsonFormData.roomID);
//                 $("room:" + jsonFormData.chatName + " p").add("button").click(joinToTheChat());
//                 roomsList.set(chatName, roomID);
//                 socket.emit('create chat', JSON.stringify(jsonFormData));
//             }
//         }
//         createChatRoom();
//     });



// });

$(document).ready(function(){
    var socket = io('http://localhost:3000');
    export default socket;
    socket.on('connection', () => {
        console.log("connect");
    });

    $("#createChatBut").click(function(){
        function createChatRoom(){
            var chatName = $("#chatNameField").val();
            if(chatName == ""){
                console.log("chatName is empty!");
            }
            else{
                var roomID = Math.random();
                var jsonFormData = {
                    chatName,
                    roomID
                };

                socket.emit('join', JSON.stringify(jsonFormData));
            }
        }
        createChatRoom();
    });
});