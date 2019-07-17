const Web3 = require("web3")
let web3 = new Web3("http://127.0.0.1:8500");
let accounts = require("../../nodejs-assets/nodejs-project/CryptoApi/BlockChain")(web3).accounts
const fs = require("fs")
const auth = require("../../nodejs-assets/nodejs-project/CryptoApi/Auth")


let testAccount = {
    "version": 3,
    "id": "ad68ef9f-56ed-44f6-9f42-76e43274b56a",
    "address": "24ef2e68408ce4d682b0d27d8d271adcedf297c8",
    "crypto": {
        "ciphertext": "6520b84b9b873875a9a86d9472eb1b16da73e0f39f9ea22b8f66907f296bea1a",
        "cipherparams": {
            "iv": "f687cf2d1240b882115932503a6f1927"
        },
        "cipher": "aes-128-ctr",
        "kdf": "scrypt",
        "kdfparams": {
            "dklen": 32,
            "salt": "5db92777634606ea2a5fb2c8ec638d398266ebaa65839ec4d2af5e2d1ef4b62a",
            "n": 8192,
            "r": 8,
            "p": 1
        },
        "mac": "ffc1d7b7af03d9db2b3d6146ab9c000df2eef4d9366e2bcc189852c20c485932"
    }
}


/*

test("get public accounts", () => {
    accounts.getPublicAddresses()
    .then((res)=>{
        expect(res).toBeDefined();
    })
    .catch((err)=>{
        console.log(err)
    })
})


test("delete testAccount Success", () => {
    const realPass = "12345"
    fs.writeFile("../Accounts/" + testAccount.address, JSON.stringify(testAccount), (err) => {
        if (err) {
            console.error(err);
            return err
        }


        accounts.deleteAccount(testAccount.address, realPass)
            .then((res) => {
                expect(res).toEqual("Account file deleted");
            })
            .catch((err) => {
                console.error(err)
            })
    })
})



test("delete testAccount Fail, bad password", () => {
    const realPass = "12345"
    fs.writeFile("../Accounts/" + testAccount.address, JSON.stringify(testAccount), (err) => {
        if (err) {
            console.error("couldn't save account");
            console.error(err);
            return err
        }

        accounts.deleteAccount(testAccount.address, "1234")
            .then((res) => {
                console.error(res)
            })
            .catch((err) => {
                expect(err).toEqual(new Error("Key derivation failed - possibly wrong password"))
            })
    })

})


test("create testAccount Success", () => {
    const password = "12345"
    accounts.createAccount(password)
        .then((encryptedAccount) => {

            accounts.deleteAccount(encryptedAccount.address, password)
                .then((res) => {
                    expect(res).toEqual("Account file deleted");
                })

                .catch((err) => {
                    console.err(err)
                })
        })
        .catch((err) => {
            console.err(err)
        })
})

*/