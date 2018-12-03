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
router.post("/getBalance", (req, res) => {
    if (Array.isArray(req.body.addresses) === false) {
        res.send("the request was poorly formatted, need this: {addresses:[0x1234...]}")
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
        .catch(console.warn)

})


module.exports = router;