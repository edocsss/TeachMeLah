var mongojs = require('mongojs')
var db = mongojs('mydb');
var Chats = db.collection('chats');
var ioHandler = null;
var clientList = {};

module.exports = {
    init: init,
    getChatHistory: getChatHistory
};

function init (io) {
    ioHandler = io;
    io.on('connection', function (socket) {
        console.log('New client connected!');

        // Register socket with the client's unique identifier (email address)
        socket.on('hi', function (message) {
            // Use socket ID as key since there are 2 emulators with the same user email address
            clientList[socket.id] = {
                email: message,
                socket: socket
            };
        });

        socket.on('new_message', function (message) {
            var messageJson = JSON.parse(message);
            var sender = messageJson.sender;
            var receiver = messageJson.receiver;
            var content = messageJson.content;

            saveMessage(messageJson);
            sendMessageToTarget(receiver, message);
        });

        socket.on('disconnect', function () {
            // removeSocketFromClientList(socket.id);
            console.log('DISCONNECTED!');
        });
    });
}

function saveMessage (messageObject) {
    Chats.insert({
        sender: messageObject.sender,
        receiver: messageObject.receiver,
        content: messageObject.content,
        date: new Date()
    });
}

function sendMessageToTarget(receiver, message) {
    console.log('Sending message to target..')
    console.log(message);

    for (var socketId in clientList) {
        if (clientList[socketId].email === receiver) {
            clientList[socketId].socket.emit('new_message', message);
            return;
        }
    }
}

function removeSocketFromClientList (socketId) {
    delete clientList[socketId];
}

function getChatHistory (reqBody, res) {
    var participantEmails = [reqBody.senderEmail, reqBody.receiverEmail];
    Chats.find({
        sender: {
            '$in': participantEmails
        },
        receiver: {
            '$in': participantEmails
        }
    }).toArray(function (err, docs) {
        console.log(docs);
        res.status(200);
        res.json({
            chatHistory: docs
        });
    });
}