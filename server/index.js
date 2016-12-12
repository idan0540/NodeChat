var http = require('http');
var static = require('node-static');
var fileServer = new static.Server('./public/');

var WebSocketServer = require('websocket').server;

var users = [];

const PORT = 8000;

function handleRequest(request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (e, res) {
            if (e && e.status == 404) {
                fileServer.serveFile('html/chat.html', 404, {}, request, response);
            }
        });
    }).resume();
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
    console.log("Server listening on: http://10.103.50.197:%s", PORT);
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    users.push(connection);

    connection.on('message', function (message) {
        users.forEach(function (user) {
            // if (user != connection) {
            user.sendUTF(JSON.stringify({data: message.utf8Data}));
            // }
        });
    });
});