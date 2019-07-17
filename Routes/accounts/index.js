const express = require("express")
const router = express.Router()

router.get("/getAccounts", (req, res) => {
    req.bc.accounts.getAccounts()
        .then((accounts) => {
            res.send(accounts)
        })
        .catch((err) => {
            res.send("couldn't get accounts" + err)
        })
})

router.get("/getPublicAddresses", (req, res) => {
    req.bc.accounts.getPublicAddresses()
        .then((addresses) => {
            res.send(addresses);
        })
        .catch((err) => {
            res.send("couldn't get addresses" + err)
        })
})

//request must have a addresses field that takes a list
//{addresses:[0x1234...]}
router.post("/getBalances", (req, res) => {

    if (Array.isArray(req.body.addresses) === false) {
        res.send("the request was poorly formatted, need this: {addresses:[0x1234...]")
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
            res.send("couldn't get balances" + err)
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

//{account:"0x12345..."};
router.post("/deleteAccount", (req, res) => {
    let msg = req.body
        
        if (!msg.hasOwnProperty("address")) {
            res.send({action: "error", payload: {address:"0x12345..."}});
            return false;
        }

        req.bc.accounts.deleteAccount(msg.account)
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
            res.send({action: "error", payoad: "action no account field: {address:0x123...}"});
            return
        }
        
        req.bc.accounts.loadWallet(msg.address)
        .then((account) => {
            req.bc.accounts.setDefaultAccount(account)
            res.send({action:"changeDefault", payload: req.web3.eth.defaultAccount});
        })
        .catch(() => {
            res.send({action: "error", payload: "failed changing default account"});
        })

})

router.get("/defaultAddress", (req, res) => {
    res.send({action:"getDefault", payload: req.web3.eth.defaultAccount})
})

//No function accounts.send
router.post("/send", (req, res)=> {
    req.bc.accounts.send(req.body)
        .then((data)=>{
            res.send(data)
        })
        .catch(()=>{
            res.send("error: in sending")
        })
    })


module.exports = router
