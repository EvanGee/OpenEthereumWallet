
const fs = require("fs")

const read = (path) => new Promise((resolve, reject)=>{
    fs.readFile(path, (err, data) => {
        if (err) {
            reject(err)
            return;
        }
        resolve(data.toString())
    })
})


const write = (path, data) => new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.error(err);
            reject(err)
        }

        resolve(true)
    })
})


module.exports = {
    read,
    write
}