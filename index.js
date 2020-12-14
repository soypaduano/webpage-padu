var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
var http = require('http');
var request = require('request');
var bodyParser = require('body-parser')

const cors = require('cors');
app.use(cors())


var server = http.Server(app);
app.use(express.static('client'));
app.use(bodyParser.json())

server.listen(PORT, function () {
  console.log('Chat server running');
});

app.use(express.static(__dirname + '/public'))

app.all('/distrito-cultural', cors(), function (request, response, nextt) {
  response.sendFile('client/actividadesCulturales/index.html' , { root : __dirname});
});

app.all('/aprende-programacion', cors(), function (request, response, nextt) {
  response.sendFile('client/aprendeProgramacion/index.html' , { root : __dirname});
});

app.all('/password-game', cors(), function (request, response, nextt) {
  response.sendFile('client/passwordGame/index.html' , { root : __dirname});
});

app.all('/frases-trap', cors(), function (request, response, nextt) {
  response.sendFile('client/frasesTrap/index.html' , { root : __dirname});
});

app.all('/distrito-cultural/request', cors(), function (reqq, ress, nextt) {
  var url_actividades_culturales_ocio_municipal_100_dias = "http://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json"
  //var url_agenda_actividades_culturales = "https://datos.madrid.es/egob/catalogo/300107-0-agenda-actividades-eventos.json"
  //var url_agenda_biblioteca = "https://datos.madrid.es/egob/catalogo/206717-0-agenda-eventos-bibliotecas.json";
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