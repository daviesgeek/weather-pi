var express = require("express");
var server = express();
var serverPort = 3000;

server.get('/', function(req, res) {
        res.send("Work in progress...")
})

server.listen(serverPort, function() {});
