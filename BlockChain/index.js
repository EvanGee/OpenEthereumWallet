


const Accounts = require("./accounts")
const clique = require("./clique")
const contracts = require("./contracts")

module.exports = (web3) => ({
    
    contracts : contracts(web3),
    clique,
    accounts : new Accounts(web3),
})