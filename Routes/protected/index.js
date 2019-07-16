
const express = require("express")
const router = express.Router()
const Web3 = require("web3")

router.post("/changeProvider", (req, res) => {

    if (req.body.hasOwnProperty("newProvider") === false) {
        res.send("please set a new provider with {newProvider: 'http://provider:port'}")
        return
    }
    try {
        req.web3 = new Web3(req.body.newProvider);
    }
    catch (err) {
        res.send("error: couldn't set provider, it doesn't exist")
        console.log(err)
        return;
    }
    
    bc = require("../../BlockChain")(req.web3);
    web3 = req.web3
    res.send(`{provider:${req.web3.currentProvider.host}}`)
})


router.get("/getCurrentProvider", (req,res) => {
    res.send(`{provider:${req.web3.currentProvider.host}}`)
})

router.get("/", (req, res) => {
    res.send(JSON.stringify({
        "sup": "yo"
    }))
})



//No function accounts.send
router.post("/send", (req, res)=> {
    console.log("sending", req.body)

    req.bc.accounts.send(req.body)
        .then((data)=>{
            res.send(data)
        })
        .catch(()=>{
            res.send("error: in sending")
        })
    })


module.exports = router
