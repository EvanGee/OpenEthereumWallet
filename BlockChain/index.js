


const Accounts = require("./accounts")
const contracts = require("./contracts")
const Auth = require("./auth")

module.exports = (web3) => ({    
    contracts : contracts(web3),
    accounts : new Accounts(web3),
    auth : new Auth(web3),
    web3
})