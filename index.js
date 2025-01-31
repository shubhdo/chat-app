var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

const funnyResponses = [
  "Why don't skeletons fight each other? They don't have the guts!",
  "I used to play piano by ear, but now I use my hands!",
  "I'm on a whiskey diet... I’ve lost three days already!",
  "Why don’t oysters donate to charity? Because they are shellfish.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Parallel lines have so much in common. It’s a shame they’ll never meet.",
  "I'm reading a book on anti-gravity. It's impossible to put down!",
  "I told my computer I needed a break, and now it won't stop sending me Kit-Kats!"
];




app.get('/',function(req,res) {
	res.sendFile(__dirname+'/index.html');
})

io.on('connection',function(socket) {
    console.log("a user connected");

     socket.on('chat message',function(message) {
        io.emit('chat message event', message);
        const randomIndex = Math.floor(Math.random() * funnyResponses.length);
        io.emit('chat message event', funnyResponses[randomIndex]);
     })

     socket.on('disconnect', function(){
    console.log('user disconnected');
  });
})

http.listen(3000,function() {
    console.log("listening on 3000");
})
