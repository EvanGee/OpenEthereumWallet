const express = require("express")
const router = express.Router()

router.post("/getContractAddress", (req, res)=>{
    if (!req.body.hasOwnProperty("id")) {
        res.send({action: "error", payload: "id field undefined, send a request with id eg, {id: 'unique identifier'}"})
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
        res.send({action: "error", payload: "contract field undefined, send a request with eg, {contract: 'contractName'}"})
        return;
    }

    if (!req.body.hasOwnProperty("gas")) {
        res.send({action: "error", payload: "gas field undefined, send a request with (the max gas you wish to spend) eg, {gas: '1000000'}"})
        return;
    }

    if (!req.body.hasOwnProperty("id")) {
        res.send({action: "error", payload: "id field undefined, send a request with (the max gas you wish to spend) eg, {id: 'unique identifier'}"})
        return;
    }

    req.bc.contracts.deploy(req.web3.eth.defaultAccount, req.body.contract, req.body.args, req.body.gas)
        .then((contract) => {;
            req.bc.contracts.saveAddress(req.body.id, contract._address)
            res.send(contract._address)
            console.log(contract)
 
        })
        .catch((err) => {
            res.send({action: "error", payload: err})
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
        res.send({action: "error", payload: "function field undefined, send a request with eg, {contract: name, function: 'foo', args: '[bar, stuff], gas: 21000, value: 10000'}"})
        return;
    }
    if (!req.body.hasOwnProperty("args")){
        res.send({action: "error", payload: "args field undefined, send a request with eg, {contract: name, function: 'foo', args: '[bar, stuff], gas: 21000, value: 10000'}"})
        return;
    }
    if (!req.body.hasOwnProperty("contract")) {
        res.send({action: "error", payload: "contract field undefined, send a request with eg, {contract: 'contractName'}"})
        return;
    }
    if (!req.body.hasOwnProperty("gas")) {
        res.send({action: "error", payload: "gas field undefined, send a request with (the max gas you wish to spend) eg, {gas: '1000000'}"})
        return;
    }
    if (!req.body.hasOwnProperty("id")) {
        res.send({action: "error", payload: "id field undefined, send a request with (the max gas you wish to spend) eg, {id: 'unique identifier'}"})
        return;
    }


    req.bc.contracts.funcCall(req.body)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send({action: "error", payload: err})
    })
})

router.post("/getEvents", (req, res) => {
    if (!req.body.hasOwnProperty("contract")) {
        res.send({action: "error", payload: "contract field undefined, send a request with eg, {contract: 'contractName'}"})
        return;
    }
    if (!req.body.hasOwnProperty("id")) {
        res.send({action: "error", payload: "id field undefined, send a request with (the max gas you wish to spend) eg, {id: 'unique identifier'}"})
        return;
    }
    if (!req.body.hasOwnProperty("eventName")){
        res.send({action: "error", payload: "eventName field undefined, send a request with eg, {eventName: name}"})
        return;
    }
    if (!req.body.hasOwnProperty("fromBlock")){
        res.send({action: "error", payload: "error: fromBlock field undefined, send a request with eg, {fromBlock: 0}"})
        return;
    }
    if (!req.body.hasOwnProperty("toBlock")){
        res.send({action: "error", payload: "toBlock field undefined, send a request with eg, {toBlock: latest}"})
        return;
    }
    

    req.bc.contracts.getAllEvents(req.body.id, req.body.address, req.body.contract, req.body.eventName, req.body.fromBlock, req.body.toBlock)
    .then((events)=>{
        res.send(events)
    })
    .catch(console.error)

})

router.post("/estimate", (req, res) => {
    //console.log(req.web3.eth.estimateGas({to: "0xEDA8A2E1dfA5B93692D2a9dDF833B6D7DF6D5f93", amount: web3.toWei(1, "ether")}))
})


module.exports = router;
