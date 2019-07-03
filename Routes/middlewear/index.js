const express = require("express")
const router = express.Router()

const Web3 = require("web3")
//let web3 = new Web3("http://167.99.185.196:8555");

let web3 = new Web3("http://68.183.196.133:8555");

bc = require("../../BlockChain")(web3);

/*
bc.accounts.getPublicAddresses()
.then((addresses)=>{
    console.log(addresses)
    bc.accounts.setDefaultAccount(addresses[0])
    .then((res)=>{
      console.log("set default: " + res)
    })
    .catch((err)=>{
      console.log(err)
    })
})
*/
bc.accounts.loadWallet("343290ccfc13ce5e7975cb511c913d6604da0244", "pass1234")
.then((account)=>{
  bc.accounts.setDefaultAccount(account)
  .then((res)=>{
    console.log("set default: " + res)
  })
  .catch((err)=>{
    console.log(err)
  })
})


const web3Inject = (req, res, next) => {
    req.web3 = web3;
    req.bc = bc;
    next();
}

const setHeaders = (req, res, next) => {
    res.set('content-type', 'application/json')
    next()
}

router.use(web3Inject)
router.use(setHeaders)

//change provider
router.post("/changeProvider", (req, res) => {

    if (req.body.hasOwnProperty("newProvider") === false) {
        res.send("please set a new provider with {newProvider: 'provider'}")
        return
    }

    web3 = new Web3(req.body.newProvider);
    bc = require("../../BlockChain")(web3);
    res.send(`{provider:${web3.currentProvider}}`)
})


router.get("/getCurrentProvider", (req,res) => {
    res.send(req.web3.currentProvider);
    
})

module.exports = router;
