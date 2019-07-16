const express = require("express")
const router = express.Router()
const path = require("path")

router.get("/", (req, res) => {
    res.send(JSON.stringify({
        "sup": "yo"
    }))
})


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

// {newAccount: {password: somevalue}}
router.post("/newAccount", (req, res) => {
    
    let msg = req.body
    if (msg.hasOwnProperty("newAccount")) {
    
        if (!msg.newAccount.hasOwnProperty("password")) {
            res.send({action: "error", payload: "send with fromat: action: {newAccount:{password:example1234}}"});
            return false;
        }

        req.bc.accounts.createAccount(msg.newAccount.password)
        .then((encryptedKey) => {
            res.send({action:"newAccount", payload: encryptedKey.address});
            return true
        })
        .catch((err)=>{
            res.send({action: "error", payload: err});
        })
    }
})

//{deleteAccount:{account:"0x12345...", password: "somepassword"}}});
router.post("/deleteAccount", (req, res) => {
    let msg = req.body
        if (msg.hasOwnProperty("deleteAccount")) {
        
            if (!msg.deleteAccount.hasOwnProperty("account")) {
                res.send({action: "error", payload: {deleteAccount:{account:"0x12345...", password: "somepassword"}}});
                return false;
            }
    
            if (!msg.deleteAccount.hasOwnProperty("password")) {
                res.send({action: "error", payload: {deleteAccount:{account:"0x12345...", password:"somepassword"}}});
                return false;
            }
    
            req.bc.accounts.deleteAccount(msg.deleteAccount.account, msg.deleteAccount.password)
            .then((data) => {
                res.send({action:"deleteAccount", payload: data});
            })
            .catch((err)=>{
                res.send({action: "error", payload: err});
            })
        }
})

router.post("/changeDefault", (req, res) => {
    let msg = req.body
    if (msg.hasOwnProperty("changeDefault")) {
        if (!msg.changeDefault.hasOwnProperty("account")) {
            res.send({action: "error", payoad: "action no account field: {changeDefault:{account:0x123..., password:1234}}"});
            return
        }
            
        if (!msg.changeDefault.hasOwnProperty("password")) {
            res.send({action: "error", payload: "give me a password you nub {changeDefault:{account:0x123..., password:1234}}"});
            return
        }

        req.bc.accounts.loadWallet(msg.changeDefault.account, msg.changeDefault.password)
        .then((account) => {
            req.bc.accounts.setDefaultAccount(account)
            res.send({action:"changeDefault", payload: req.web3.eth.defaultAccount});
        })
        .catch(() => {
            res.send({action: "error", payload: "failed changing default account"});
        })
    }
})

router.get("/defaultAddress", (req, res) => {
    res.send({action:"getDefault", payload: req.web3.eth.defaultAccount})
})

module.exports = router;