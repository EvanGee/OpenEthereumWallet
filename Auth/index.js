
const bcrypt = require('bcrypt');
const saltRounds = 10;
const utils = require("../utils.js")
const read = utils.read
const write = utils.write

module.exports = class pass {

    constructor() {
        this.path = __dirname + "/password"
        this.authenticate = this.authenticate.bind(this);
    }
    

    getPassword() {
        return read(this.path)
    }

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

    compare(plaintextPassword) {
        return new Promise((resolve, reject)=>{

            this.getPassword().then((hash)=>{
                bcrypt.compare(plaintextPassword, hash).then(function(res) {
                    resolve(res)
                })
                .catch(reject)
            })
        })
    }

    authenticate(req, res, next) {   
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

}