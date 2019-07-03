
const express = require('express')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = require("./Routes");

app.use(router);

const port = 3030
var http = require('http').Server(app);

http.listen(port, function () {
  console.log('listening on *:' + port);
});

module.exports = app