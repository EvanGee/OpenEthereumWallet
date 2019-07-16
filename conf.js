//example of getting the path
//const contractsPath = path.resolve(__dirname, "../../",  "truffle/build/contracts");
const path = require("path")
const contractsPath = path.resolve(__dirname, "./BlockChain",  "Contracts");

module.exports = {
    //default setting for http hosts
    web3HttpHost : "http://127.0.0.1:8555",
    
    //default setting for websocked hosts
    web3WSHost: "ws://127.0.0.1:8556",

    //default setting for JSON contracts path
    contractsPath: contractsPath,
}