
const express = require("express")
const router = express.Router()

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

router.get("/", (req, res) => {
    res.send(JSON.stringify({
        "sup": "yo"
    }))
})

router.post("/deploy", (req, res) => {
    if (!req.body.hasOwnProperty("contract")) {
        res.send("error: contract field undefined, send a request with eg, {contract: 'contractName'}")
        return;
    }

    if (!req.body.hasOwnProperty("gas")) {
        res.send("error:gas field undefined, send a request with (the max gas you wish to spend) eg, {gas: '1000000'}")
        return;
    }

    if (!req.body.hasOwnProperty("id")) {
        res.send("error:id field undefined, send a request with (the max gas you wish to spend) eg, {id: 'unique identifier'}")
        return;
    }

    req.bc.contracts.deploy(req.web3.eth.defaultAccount, req.body.contract, req.body.args, req.body.gas)
        .then((contract) => {;
            req.bc.contracts.saveAddress(req.body.id, contract._address)
            res.send(contract._address)
 
        })
        .catch((err) => {
            res.send("contract failed to deploy")
            console.log(err)
        })
})

//No function accounts.send
router.post("/send", (req, res)=> {
    console.log("sending", req.body)

    req.bc.accounts.send(req.body)
        .then((data)=>{
            res.send(data)
        })
        .catch(()=>{
            res.send("error in sending")
        })
    })


module.exports = router



module.exports = router;