//example of getting the path
//const contractsPath = path.resolve(__dirname, "../../",  "truffle/build/contracts");
const path = require("path")
const contractsPath = path.resolve(__dirname, "./BlockChain",  "Contracts");

module.exports = {
    //default setting for http hosts
    web3HttpHost : "http://127.0.0.1:8555",
    
    //default setting for websocked hosts (currently not implemented)
    web3WSHost: "ws://127.0.0.1:8556",

    //default setting for JSON contracts path
    contractsPath: contractsPath,

    //port that the app will listen on
    port: 3030,

    //will ask for confirmation on every api call
    userAuth: false,

    //can set password here if you don't want the user to auth (for dev stuff)
    password: "pass1234"
}