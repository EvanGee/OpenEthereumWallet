const express = require("express")
const router = express.Router()

const path = require("path")

router.get("/", (req, res) => {
    console.log("request" + req.body)
})


router.post("/getContractAddress", (req, res)=>{
    if (!req.body.hasOwnProperty("id")) {
        res.send("error:id field undefined, send a request with id eg, {id: 'unique identifier'}")
        return;
    }

    res.send(req.bc.contracts.getAddress(req.body.id))
})

/*
 {
     contract: "contract NAME",
     gas: '12345' //in wei
     id: '123' // this is can be used to get the address later, remember what ID you set it as 
     args: [] //optional
 }
*/
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
            res.send("contract failed to deploy" + err)
            console.log(err)
        })
})

/*
    {
        funcName: "name",
        args: [],
        gas: "123",
        contract: "PlayerRegistry"
        id: 1 //optional or can use address
        value: 12333 //if function is payable
    }
    */
router.post("/call", (req, res) => {
    if (!req.body.hasOwnProperty("funcName")){
        res.send("error: function field undefined, send a request with eg, {contract: name, function: 'foo', args: '[bar, stuff], gas: 21000, value: 10000'}")
        return;
    }
    if (!req.body.hasOwnProperty("args")){
        res.send("error: args field undefined, send a request with eg, {contract: name, function: 'foo', args: '[bar, stuff], gas: 21000, value: 10000'}")
        return;
    }
    if (!req.body.hasOwnProperty("gas")){
        res.send("error: gas field undefined, send a request with eg, {contract: name, function: 'foo', args: '[bar, stuff], gas: 21000, value: 10000'}")
        return;
    }
    if (!req.body.hasOwnProperty("contract")){
        res.send("error: contract field undefined, send a request with eg, {contract: name, function: 'foo', args: '[bar, stuff], gas: 21000, value: 10000'}")
        return;
    }
    if (!req.body.hasOwnProperty("id") && !req.body.hasOwnProperty("address")){
        res.send("error: id and address field undefined, you need at least one field with either address of id")
        return;
    }

    req.bc.contracts.funcCall(req.body)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(req.body.funcName + ' function not called error: '+ err)
    })
})

router.post("/estimate", (req, res) => {
    //console.log(req.web3.eth.estimateGas({to: "0xEDA8A2E1dfA5B93692D2a9dDF833B6D7DF6D5f93", amount: web3.toWei(1, "ether")}))
})


module.exports = router;
