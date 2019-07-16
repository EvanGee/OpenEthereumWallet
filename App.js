
const express = require('express')
const conf = require("./conf")
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = require("./Routes");

app.use(router);

const port = conf.port
var http = require('http').Server(app);

http.listen(port, function () {
  console.log('listening on *:' + port);
});


module.exports = app