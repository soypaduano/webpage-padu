var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
var http = require('http');
var request = require('request');
var path = require("path");
//const reload = require("reload");

var bodyParser = require('body-parser')
const {spawn} = require('child_process');

const cors = require('cors');
app.use(cors())


var server = http.Server(app);
app.use(express.static('client'));
app.use(bodyParser.json())

server.listen(PORT, function () {
  console.log('Aplicación del padu funcionando');
});

app.use(express.static(__dirname + '/public'))

app.all('/distrito-cultural', cors(), function (request, response, nextt) {
  response.sendFile('client/actividadesCulturales/index.html', { root: __dirname });
});

app.all('/aprende-programacion', cors(), function (request, response, nextt) {
  response.sendFile('client/aprendeProgramacion/index.html', { root: __dirname });
});

app.all('/password-game', cors(), function (request, response, nextt) {
  response.sendFile('client/passwordGame/index.html', { root: __dirname });
});

app.all('/frases-trap', cors(), function (request, response, nextt) {
  response.sendFile('client/frasesTrap/index.html', { root: __dirname });
});

app.all('/bicis-boardman', cors(), function (request, response, nextt) {
  response.sendFile('client/bicisBoardman/index.html', { root: __dirname });
});

app.all('/madrid-flag', cors(), function (request, response, nextt) {
  response.sendFile('client/madridFlag/index.html', { root: __dirname });
});

app.all('/covid-bot', cors(), function (request, response, nextt) {
  response.sendFile('client/covidBot/index.html', { root: __dirname });
});

app.get('/covid-bot/pytest', (req, res) => {

  var dataToSend; // spawn new child process to call the python script
  //const python = spawn('python', ['public/covidBot/test.py']); // collect data from script
  const python = spawn('python', ['public/covidBot/test2.py', req.query.input]);
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.send(dataToSend) // send data to browser
  });
});

  app.all('/distrito-cultural/request', cors(), function (reqq, ress, nextt) {
    var url_actividades_culturales_ocio_municipal_100_dias = "http://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.json"
    //var url_agenda_actividades_culturales = "https://datos.madrid.es/egob/catalogo/300107-0-agenda-actividades-eventos.json"
    //var url_agenda_biblioteca = "https://datos.madrid.es/egob/catalogo/206717-0-agenda-eventos-bibliotecas.json";
    request({
      url: url_actividades_culturales_ocio_municipal_100_dias,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        ress.send(body);
      }
    })
  });