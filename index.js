"use strict";

var config = require('./.config.js'),
    express = require('express'),
    app = express(),
    serverPort = 3000,
    thinky = require('thinky')({host: 'rethinkdb.local', port: '49186', db: 'database'}),
    type = thinky.type,
    http = require('http').Server(app),
    io = require('socket.io')(http),
    Wunderground = require('./models/Wunderground'),
    weather = new Wunderground(config);

app.set('view engine', 'jade');


var Data = thinky.createModel('Data', {
  id: type.string(),
  date: type.date(),
  temp: type.number(),
  humidity: type.number(),
})

io.on('connection', function(socket){
  var data = Data.orderBy('date').run().then(function (data) {
    io.emit('data', data)
    Data.changes().then(function (feed) {
      var newData = []
      feed.each(function (error, doc) {
        io.emit('newData', doc)
      })
    })
  })
  io.emit('weather', require('./data.js'))
  // weather.get(['forecast', 'conditions']).then(function (forecastData) {
  //   io.emit('forecast', forecastData)
  // })
})

app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.set('views', 'public')
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/new', function(req, res) {
  var row = new Data({temp: 75, humidity: 20, date: new Date()})
  row.save()
  res.send(row)
})

http.listen(serverPort, function() {});