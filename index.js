var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
var http = require('http');
var request=require('request');
var bodyParser = require('body-parser')

const cors = require('cors');
app.use(cors())


var server = http.Server(app);
app.use(express.static('client'));
app.use(bodyParser.json())

server.listen(PORT, function() {
  console.log('Chat server running');
});

app.all('/secret', function (req, res, next) {
  res.send('el secreto está aquí');
});

var io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('message', function(msg) {
    io.emit('message', msg);
  });
});


app.all('/actividades-culturales', cors(), function (reqq, ress, nextt) {


var url_actividades_culturales_ocio_municipal_100_dias = "http://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json"
var url_agenda_actividades_culturales = "https://datos.madrid.es/egob/catalogo/300107-0-agenda-actividades-eventos.json"
var url_agenda_biblioteca = "https://datos.madrid.es/egob/catalogo/206717-0-agenda-eventos-bibliotecas.json";



request({
    url: url_actividades_culturales_ocio_municipal_100_dias,
    json: true
}, function (error, response, body) {
  console.log("ESTAMOS HACIENDO ESTO")
    if (!error && response.statusCode === 200) {
      //console.log(body);
        ress.send(body);
    }
})
});