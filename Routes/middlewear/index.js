const express = require("express")
const router = express.Router()

const Web3 = require("web3")
web3 = new Web3("http://127.0.0.1:8500");
bc = require("../../BlockChain")(web3);


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
router.post("/changeProvider", (req, res, next) => {
    //certain providers http://127.0.0.1:8500
    console.log(req.body)
    if (req.body.hasOwnProperty("newProvider") === false) {
        res.send("please set a new provider with {newProvider: 'provider'}")
        return
    }

    web3 = new Web3(req.body.newProvider);
    bc = require("../../BlockChain")(web3);
    res.send(`{provider:${web3.currentProvider}}`)
})




module.exports = router;
