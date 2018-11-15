const express = require("express")
const router = express.Router()
router.get("/", (req, res, next) => {
    res.set('content-type', 'application/json')
    next()
})




module.exports = router;
