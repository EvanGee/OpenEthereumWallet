const express = require("express");
const router = express.Router();
const blockchainRoute = require("./blockchain");
const accounts = require("./accounts")
const middlewear = require("./middlewear")
const protectedAccounts = require("./accounts/protected")

router.use(middlewear);
router.use("/accounts", accounts);
router.use("/blockchain", blockchainRoute);
//router.use("/protected/accounts", protectedAccounts);

module.exports = router;