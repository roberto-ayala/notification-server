var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var util = require('util');
var config = require('./config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(config.server.port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/notification', function (req, res) {
  var event = req.body.event;
  var data = req.body.data;
  io.emit(event, data);
  res.sendStatus(204);
  util.log('Emit event: ' + event);
  util.log('With data', data);
});

io.on('connection', function (socket) {
  util.log('Client id: ', socket.client.id);
});