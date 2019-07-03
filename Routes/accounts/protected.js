
/*
const authlib = require("../../Auth")
const auth = new authlib()

const express = require("express")
const router = express.Router()

router.use(auth.authenticate)

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
            res.send("error in sending")
        })
    })


module.exports = router
*/