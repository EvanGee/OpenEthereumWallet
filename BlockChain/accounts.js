const fs = require("fs")


module.exports = class Accounts {

    constructor(web3) {
        this.web3 = web3
        this.path = __dirname + "/Accounts/"
        this.pass = "pass"
        this.decryptAccount = this.decryptAccount.bind(this)
        this.getAccounts = this.getAccounts.bind(this)
        this.getPublicAddresses = this.getPublicAddresses.bind(this)
        this.createAccount = this.createAccount.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
        this.setDefaultAccount = this.setDefaultAccount.bind(this)
        this.addPass = this.addPass.bind(this)
        this.loadWallet = this.loadWallet.bind(this)
    }

    decryptAccount(account, password) {
        return new Promise((resolve, reject) => {
            let decryptedAccount;
            fs.readFile(this.path + account, (err, data) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                try {
                    decryptedAccount = this.web3.eth.accounts.decrypt(JSON.parse(data), password)
                }
                catch(err) {
                    reject(err)
                }
                resolve(decryptedAccount)
            })
        })
    }


    getAccounts() {
        return new Promise((resolve, reject) => {
            fs.readdir(this.path, (err, files) => {
                let promiseList = []
                if (err) {
                    console.error(err)
                    reject(err)
                }
                files.forEach(file => {
                    promiseList.push(
                        new Promise((resolve, reject) => {
                            fs.readFile(this.path + file, (err, data) => {
                                if (err) reject(err);
                                resolve(data.toString())
                            })
                        }))

                })
                resolve(Promise.all(promiseList))
            })
        })
    }


    getPublicAddresses() {
        return new Promise((resolve, reject) => {
            this.getAccounts()
                .then((encryptedAccounts) => {
                    let addresses = [];
                    encryptedAccounts.map((account) => {
                        let parsedAccount = JSON.parse(account);
                        addresses.push(parsedAccount.address);
                    });
                    resolve(addresses);
                })
                .catch((err) => {
                    reject(err);
                })
        });

    }

    createAccount() {
        const password = this.pass
        return new Promise((resolve, reject) => {
            let account = this.web3.eth.accounts.create()
            let encryptedAccount = account.encrypt(password);
            fs.writeFile(this.path + encryptedAccount.address, JSON.stringify(encryptedAccount), (err) => {
                if (err) {
                    console.error(err);
                    reject(err)
                }

                resolve(encryptedAccount)
            })
        })
    }

    deleteAccount(address) {
        const password = this.pass
        return new Promise((resolve, reject) => {
            this.decryptAccount(address, password)
                .then((response) => {
                    const File = this.path + address
                    const stats = fs.statSync(File)

                    //zero out memory
                    const zeroArray = new Array(stats.size).fill(0);
                    fs.writeFile(this.path + address, zeroArray, (err) => {
                        if (err) {
                            console.error(err);
                            reject(err)

                        }
                        
                        fs.unlinkSync(this.path + address);
                        resolve(address)
                    })
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    loadWallet(account) {
        const password = this.pass
        return new Promise((resolve, reject) => {
            this.decryptAccount(account, password)
                .then((accountObject) => {
                    
                    this.web3.eth.accounts.wallet.add(accountObject)
                    resolve(account)
                })
                .catch(reject)
        })
    }

    convertToHexAccount(address){
        if (address[0] === '0' && address[1] === "x") {
            return ""
        }
        const ad = "0x" + address
        return ad;
    }

    convertToNonHexAccount(address) {
        if (address[0] !== '0' && address[1] !== "x") {
            return ""
        }
        let newAddress = address.slice(2)
        return newAddress.toLowerCase();
    }

    setDefaultAccount(account) {
        return new Promise((resolve, reject) => {
            const wallet = this.web3.eth.accounts.wallet
            for (let key in wallet) {

                if (typeof wallet[key].address != "string")  {
                    continue;
                }

                let hex_account = wallet[key].address.toUpperCase()
                let converted_hex_account = this.convertToHexAccount(account).toUpperCase()
    
                if (hex_account === converted_hex_account) {
                    this.web3.eth.defaultAccount = wallet[key].address
                    resolve(this.web3.eth.defaultAccount)
                }

            }
            reject("couldn't set default")
        })
    }

    getDefaultAccount() {
        return this.web3.eth.defaultAccount;    
    }

    send(transactionObject) {
        return this.web3.eth.sendTransaction(transactionObject)
    }

    getBalance(account) {
        return this.web3.eth.getBalance(account)
    }

    addPass(pass) {
        this.pass = pass;
    }

}