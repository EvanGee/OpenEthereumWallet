
const express = require('express')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Web3 = require("web3")

let web3 = new Web3("http://127.0.0.1:8500");
let bc = require("./BlockChain")(web3);
//const web3 = new Web3('http://127.0.0.1:8500');



bc.accounts.loadWallet("0xEeDaf263E2C1335bdCb1ee3D3C958F34eC5aD894", "pass1234")
.then((account)=>{
  bc.accounts.setDefaultAccount(account)
  console.log("set default account to:", web3.eth.defaultAccount)
})

//changeProvider can be sent to change the web3 instance
const web3Inject = (req, res, next) => {

  if (req.body.changeProvider !== undefined)
  {
    web3 = new Web3(req.body.changeProvider);
    bc = bc(web3);
  }
  req.web3 = web3;
  req.bc = bc;
  next();
}

const router = require("./Routes");
app.use(web3Inject)
app.use(router);

const port = 3030
var http = require('http');
var http = require('http').Server(app);

http.listen(port, function () {
  console.log('listening on *:' + port);
});

module.exports = app