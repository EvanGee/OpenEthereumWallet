const express = require("express")
const router = express.Router()
const conf = require("../../conf.js")
const Web3 = require("web3")

//const pass = "pass1234"
const setDefault = async (bc, pass) => {
  bc.accounts.addPass(pass)
  bc.accounts.getPublicAddresses()
  .then((addresses)=>{
      if (addresses.length === 0)
        return;
      bc.accounts.loadWallet(addresses[addresses.length-1], pass)
      .then((account)=>{
        bc.accounts.setDefaultAccount(account)
        .then((res)=>{
          console.log("set default: " + res)
        })
        .catch((err)=>{
          console.log("error", err)
        })
      })
  })
}

const getPassword = (bc) => {
  bc.auth.getPasswordFromUser(bc)
  .then((pass)=>{
    setDefault(bc, pass)
  })
  .catch((err) => {
    getPassword(bc)
  })  
}



const initWeb3 = () => {
  if (typeof web3 === 'undefined') { 
    web3 = new Web3(conf.web3HttpHost);
    console.log("set host: ", web3.currentProvider.host)
    bc = require("../../BlockChain")(web3);

    if (conf.password != undefined)
      setDefault(bc, conf.password)
    else
      getPassword(bc) 
  }
}


const web3Inject = (req, res, next) => {

    req.web3 = web3
    req.bc = bc
    
    if (req.web3.eth.defaultAccount == null)
      setDefault(req.bc)

    next();
}

const setHeaders = (req, res, next) => {
    res.set('content-type', 'application/json')
    next()
}

const auth = (req, res, next) => {
    req.bc.auth.getUserConfirmation(req, res)
    .then(next)
    .catch(console.error)
}
const log = (req, res, next) => {
  console.log(req.url + " data=" + JSON.stringify(req.body))
  next()
}

router.use(log)
router.use(web3Inject)
router.use(setHeaders)
if (conf.userAuth)
  router.use(auth)

initWeb3()

module.exports = router;
