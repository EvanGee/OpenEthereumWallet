//Environment variables
const path = require("path")
const contractsPath = path.resolve(__dirname, "../../",  "truffle/build/contracts");
const addressPath = path.resolve(__dirname, 'Contracts', 'addresses.js')
const fs = require("fs")
//const addresses = require("./addresses")

const getContract = (web3, contractName, address) => {

    const contractJson = require(path.resolve(contractsPath, contractName))
    const abi = contractJson.abi;
    const contract = new web3.eth.Contract(abi, address)
    return contract

}

module.exports = (web3) => ({
    
    deploy: async (account, contractName, args, gas) => {
        if (args === undefined)
            args = []

        const contPath = path.resolve(contractsPath, contractName)
        const contractJson = require(contPath)

        const Contract = new web3.eth.Contract(contractJson.abi)

        //returns newContractInstance on success
        return Contract.deploy({ data: contractJson.bytecode, arguments: args }).send(
            {
                from: account,
                gas: gas
            })

    },

    funcCall: async ({ address, id, contract, funcName, args, gas, value }) => {
        return new Promise((resolve, reject) => {


            var addr = address
            if (address === undefined){
                const addresses = require(addressPath)
                addr = addresses[id]
            } 

            const cont = getContract(web3, contract, addr)

            cont._jsonInterface.map((d) => {
                if (d.name != funcName)
                    return;

                if (gas < 0)
                    reject("gas must be > 0")

                if (d.stateMutability === "view" && gas > 0) {
                    reject("you don't need to spend gas on functions that don't modify the blockchain")
                }

                else if (d.stateMutability !== "view" && gas == 0) {
                    reject("you need gas to calll functions that modify the blockchain (are not 'view' functions)")
                }
                if (d.stateMutability !== "view" && gas > 0) {
                    if (args.length !== 0) {
                        cont.methods[funcName](...args).send({
                            from: web3.eth.defaultAccount,
                            gas,
                            value
                        })
                            .then(resolve)
                            .catch(reject)
                    }
                    else {
                        cont.methods[funcName]().send({
                            from: web3.eth.defaultAccount,
                            gas,
                            value
                        })
                            .then(resolve)
                            .catch(reject)
                    }
                }
                else {
                    if (args.length !== 0) {
                        cont.methods[funcName](...args).call({
                            from: web3.eth.defaultAccount
                        })
                            .then(resolve)
                            .catch(reject)
                    }
                    else {
                        cont.methods[funcName]().call({
                            from: web3.eth.defaultAccount,
                        })
                            .then(resolve)
                            .catch(reject)
                    }
                }
            })
        })
    },
    saveAddress: (id, address) => {

        var addresses = require(addressPath)
        addresses[id] = address;
        fs.writeFile(addressPath, "module.exports =" + JSON.stringify(addresses), function (err) {
            if (err) throw err;
            console.log('Saved addresses.json');
        })
    },
    getAddress: (id) => {
        var addresses = require(addressPath)
        return addresses[id];
    }

})
