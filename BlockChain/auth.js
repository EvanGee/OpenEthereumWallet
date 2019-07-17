
const bcrypt = require('bcrypt');
const saltRounds = 10;
const utils = require("./utils.js")
const read = utils.read
const write = utils.write
const { question } = require('readline-sync');

module.exports = class pass {

    constructor() {
        this.path = __dirname + "/Auth/password"
        this.authenticatePassword = this.authenticatePassword.bind(this);
        this.comparePassword = this.comparePassword.bind(this)
        this.storePassword = this.storePassword.bind(this)
        this.getPassword = this.getPassword.bind(this)
        this.hash = this.hash.bind(this)

    }
    
    //these could be used for database fetching if you want
    getPassword() {
        return read(this.path)
    }

    //these could be used for database fetching if you want
    storePassword(pass) {
        return new Promise((resolve, reject)=>{
            this.hash(pass)
            .then((pass)=>{
                write(this.path, pass)
                .then((isWritten)=>{
                    resolve(isWritten)
                })
                .catch(reject)
            })
            .catch(reject)
        })
    }

    hash(plaintextPassword) {
        return new Promise((resolve, reject)=>{
            bcrypt.hash(plaintextPassword, saltRounds).then(function(hash) {
               resolve (hash)
            })
            .catch(reject)
        })
    }

    comparePassword(plaintextPassword) {
        return new Promise((resolve, reject)=>{

            this.getPassword().then((hash)=>{
                bcrypt.compare(plaintextPassword, hash).then(function(res) {
                    if (res == false)
                        reject(res)
                    resolve(res)
                })
                .catch(()=>reject("password failed"))
            })
        })
    }

    authenticatePassword(req, res, next) {   
        this.compare(req.query.auth).then((res)=>{
            if (res === true)
                next()
            else {
                console.log("wrong password")
            }
        })
        .catch((err)=>{
            res.send("NO!")
        })
    }

    getUserConfirmation(req, res) {
        return new Promise((resolve, reject)=>{
            console.log("accept request type:" + req.method + " request for:" + req.url + " from user agent:" + req.headers["user-agent"] +" host:" + req.headers.host+ "?")
            const answer = question("[y] or [n]")
            if (answer === 'y') {
                resolve()
            }
            reject()
        })
    }

    getPasswordFromUser() {
        return new Promise((resolve, reject)=>{
            this.getPassword()
            .then((passwordHash)=>{
                const answer = question("Please enter your password: ")
                this.comparePassword(answer)
                .then(()=>resolve(answer))
                .catch(()=>reject("Password failed"))
            })
            .catch((err)=>{
                const answer = question("You don't have a password set up, (this password will be used to encrypt your keuys) enter one: ")
                this.storePassword(answer)
                .then(resolve)
                .catch(reject)
            })
        })
    }
}
