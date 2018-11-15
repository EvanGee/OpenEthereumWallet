
const fs = require("fs")


module.exports = class Accounts {

    constructor(web3) {
        this.web3 = web3
        this.path = __dirname + "/Accounts/"
    }

    decryptAccount(account, password) {
        return new Promise((resolve, reject) => {
            
            fs.readFile(this.path + account, (err, data) => {
                if (err) {
                    console.error("could not open file")
                    console.error(err)
                    reject(err)
                }
                resolve(this.web3.eth.accounts.decrypt(JSON.parse(data), password))
            })
        })
    }


    getAccounts() {
        return new Promise((resolve, reject)=>{
            fs.readdir(this.path, (err, files) => {
                let promiseList = []
                if (err) {
                    console.error("could not open directory")
                    console.error(err)
                    reject(err)
                }
                files.forEach(file => {
                    promiseList.push(
                        new Promise((resolve, reject)=>{
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

 
    async getPublicAddresses(){
        return new Promise((resolve, reject)=>{
            this.getAccounts()
            .then((encryptedAccounts)=>{
                let addresses = [];
                encryptedAccounts.map((account)=>{
                    let parsedAccount = JSON.parse(account);
                    addresses.push(parsedAccount.address);
                });
                resolve(addresses);
            })
            .catch((err)=>{
                reject(err);
            })
        });
        
    }

    createAccount(password) {
        return new Promise((resolve, reject) => {
            let account = this.web3.eth.accounts.create()
            let encryptedAccount = account.encrypt(password);
            fs.writeFile(this.path + account.address, JSON.stringify(encryptedAccount), (err) => {
                if (err) {
                    console.error("couldn't save account");
                    console.error(err);
                    reject(err)
                }
                
                resolve(encryptedAccount)
            })
        })
    }

    loadWallet(account, password) {
        return new Promise((resolve, reject) => {

            this.decryptAccount(account, password)
            .then((accountObject)=>{
                this.web3.eth.accounts.wallet.add(accountObject)
                resolve(account)
                //this.setDefaultAccount(accountObject.address)
            })
            .catch(reject)
        })
    }

    setDefaultAccount(account){
        const wallet = this.web3.eth.accounts.wallet
        for (let key in wallet){
            if(wallet[key].address === account)
                this.web3.eth.defaultAccount = wallet[key].address
        }
    }

    send(transactionObject) {
        return this.web3.eth.sendTransaction(transactionObject)
    }


    getBalance(account){
        return this.web3.eth.getBalance(account)
    }
}