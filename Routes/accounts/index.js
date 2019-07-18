const express = require("express")
const router = express.Router()

router.get("/getAccounts", (req, res) => {
    req.bc.accounts.getAccounts()
        .then((accounts) => {
            res.send({action:"getAccounts", payload: accounts})
        })
        .catch((err) => {0
            res.send({action: "error", payload: err})
        })
})

router.get("/getPublicAddresses", (req, res) => {
    req.bc.accounts.getPublicAddresses()
        .then((addresses) => {
            res.send({action: "getPublicAddresses", payload: addresses});
        })
        .catch((err) => {
            res.send({action: "error", payload: err})
        })
})

//request must have a addresses field that takes a list
//{addresses:[0x1234...]}
router.post("/getBalances", (req, res) => {

    if (Array.isArray(req.body.addresses) === false) {
        res.send({action: "error", payload: "inpropper request format use {address:0x123...}"})
        return;
    }
    
    let balances = []
    req.body.addresses.map((address, i) => {
        balances.push(req.bc.accounts.getBalance(address))
    })

    
    Promise.all(balances)
        .then((result) => {
            let final = {}
            req.body.addresses.map((address, i) => {
                final[address] = result[i];
            })
            res.send(final)
        })
        .catch((err)=>{
            res.send({action: "error", payload: err})
        })

})

router.get("/newAccount", (req, res) => {
    
    let msg = req.body
    req.bc.accounts.createAccount()
    .then((encryptedKey) => {
        res.send({action:"newAccount", payload: encryptedKey.address});
        return true
    })
    .catch((err)=>{
        res.send({action: "error", payload: err});
    })

})

//{address:"0x12345..."};
router.post("/deleteAccount", (req, res) => {
    let msg = req.body
        
        if (!msg.hasOwnProperty("address")) {
            res.send({action: "error", payload: "inpropper request format use {address:0x123...}"});
            return false;
        }

        req.bc.accounts.deleteAccount(msg.address)
        .then((data) => {
            res.send({action:"deleteAccount", payload: data});
        })
        .catch((err)=>{
            res.send({action: "error", payload: err});
        })
        
})

//{account:"0x12345..."};
router.post("/changeDefault", (req, res) => {
    let msg = req.body

        if (!msg.hasOwnProperty("address")) {
            res.send({action: "error", payload: "inpropper request format use {address:0x123...}"});
            return
        }
        
        req.bc.accounts.loadWallet(msg.address)
        .then((account) => {
            req.bc.accounts.setDefaultAccount(account)
            res.send({action:"changeDefault", payload: req.web3.eth.defaultAccount});
        })
        .catch((err) => {
            res.send({action: "error", payload: err});
        })

})

router.get("/defaultAddress", (req, res) => {
    res.send({action:"getDefault", payload: req.web3.eth.defaultAccount})
})

//No function accounts.send
router.post("/send", (req, res)=> {
    req.bc.accounts.send(req.body)
        .then((data)=>{
            res.send({action: "send", payload: data})
        })
        .catch((err)=>{
            res.send({action: "error", payload: err})
        })
    })


module.exports = router
