const express = require("express");
const router = express.Router();
const blockchainRoute = require("./blockchain");
const accounts = require("./accounts")
const middlewear = require("./middlewear")
const net = require("./net")

router.use(middlewear);
router.use("/accounts", accounts);
router.use("/blockchain", blockchainRoute);
router.use("/net", net);

module.exports = router;