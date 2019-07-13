const axios = require("axios")
const url = "http://127.0.0.1:3030/blockchain/"


/*
 {
     contract: "contract NAME",
     gas: '12345' //in wei
     id: 'PlayerReg123' // this is can be used to get the address later, remember what ID you set it as 
     args: [] //optional
 }
*/

const getPlayerAddress = () => {
        return new Promise(async (resolve, reject) => {

            const playerRegAddr = await axios.post(url + "call", {
                contract: "NameRegistry",
                gas: 0,
                id: "NameRegistry",
                funcName: "getAddress",
                args: ["PlayerRegOne"],
            })
            const defaultAccount = await axios.get("http://127.0.0.1:3030/accounts/defaultAccount")

            const playerAddr = await axios.post(url + "call", {
                            contract: "PlayerRegistry",
                            gas: 0,
                            address: playerRegAddr.data,
                            funcName: "getPlayerByAddress",
                            args: [defaultAccount.data.payload],
                        })

            resolve(playerAddr.data)
        })

}


const getItemRegAddress = () => {
    return new Promise((resolve, reject) => {

        axios.post(url + "call", {
                contract: "NameRegistry",
                gas: 0,
                id: "NameRegistry",
                funcName: "getAddress",
                args: ["ItemRegOne"],
            })
            .then((addr) => {
                resolve(addr.data)
            })
            .catch(reject)
    })
}

//player registry
const deployRegistriesTest = async () => {
    return new Promise((resolve, reject) => {

        axios.post(url + "deploy", {
                contract: "NameRegistry",
                gas: 5000000,
                id: "NameRegistry",
                args: [],
            })
            .then((nameRegAddr) => {
                console.log("NameRegistry deployed: " + nameRegAddr.data)

                //player registry
                axios.post(url + "deploy", {
                        contract: "PlayerRegistry",
                        gas: 5000000,
                        id: "PlayerRegOne",
                    })
                    .then((playerRegAddr) => {
                        console.log("PlayerRegistry deployed: " + playerRegAddr.data)
                        axios.post(url + "call", {
                                contract: "NameRegistry",
                                gas: 5000000000,
                                address: nameRegAddr.data,
                                args: ["PlayerRegOne", playerRegAddr.data],
                                funcName: "addName"
                            })
                            .then((call) => {
                                console.log("PlayerRegistry added to name registry: ", call.data.transactionHash)
                                axios.post(url + "call", {
                                        contract: "PlayerRegistry",
                                        gas: 50000000,
                                        address: playerRegAddr.data,
                                        args: [
                                            [10, 10, 10, 10, 10, 11]
                                        ],
                                        funcName: "newPlayer"
                                    })
                                    .then((newPlayer) => {
                                        console.log("added new player: " + newPlayer.data.transactionHash)
                                        resolve("Complete")

                                    }).catch(reject)
                            }).catch(reject)
                    }).catch(reject)
            }).catch(reject)
    })
}

//Item Registry Creation 
const deployItemRegistryTest = async () => {
    return new Promise((resolve, reject) => {

        axios.post(url + "deploy", {
                contract: "NameRegistry",
                gas: 5000000,
                id: "ItemRegOne",
                args: [],
            })
            .then((res) => {
                console.log("deployed ItemRegOne addr: " + res.data)

                axios.post(url + "call", {
                        contract: "NameRegistry",
                        gas: 5000000,
                        id: "NameRegistry",
                        args: ["ItemRegOne", res.data],
                        funcName: "addName"
                    })
                    .then((res2) => {
                        console.log("added name ItemRegOne to primary Registry: ", res2.data.transactionHash)

                        axios.post(url + "call", {
                                contract: "NameRegistry",
                                gas: 0,
                                id: "NameRegistry",
                                funcName: "getAddress",
                                args: ["ItemRegOne"],
                            })
                            .then((res) => {
                                console.log("Name registry added to NameRegistry: " + res.data)
                                resolve("Complete")
                            })
                            .catch(reject)
                    })
                    .catch(reject)
            })
            .catch(reject)
    })
}


//Item adding to player creation

const deployItemToRegistryTest = async () => {
    return new Promise((resolve, reject) => {

        axios.post(url + "call", {
                contract: "NameRegistry",
                gas: 0,
                id: "NameRegistry",
                funcName: "getAddress",
                args: ["PlayerRegOne"],
            })
            .then((res) => {

                console.log("player registry addr: " + res.data)
                axios.get("http://127.0.0.1:3030/accounts/defaultAccount")
                    .then((res2) => {
                        console.log("default account: " + res2.data.payload)

                        axios.post(url + "call", {
                                contract: "PlayerRegistry",
                                gas: 0,
                                address: res.data,
                                funcName: "getPlayerByAddress",
                                args: [res2.data.payload],
                            })
                            .then((playerAddr) => {
                                console.log("player address: " + playerAddr.data)

                                axios.post(url + "deploy", {
                                        contract: "Item",
                                        gas: 5000000,
                                        id: "SexyItemTest",
                                        args: [
                                            [30, 30, 30, 30, 30, 30, 30, 30]
                                        ],
                                    })
                                    .then((itemAddr) => {

                                        console.log("SexyItemTest address: " + itemAddr.data)
                                        axios.post(url + "call", {
                                                contract: "NameRegistry",
                                                gas: 500000,
                                                id: "ItemRegOne",
                                                args: ["SexyItemTest", itemAddr.data],
                                                funcName: "addName"
                                            })
                                            .then((stuff) => {
                                                console.log("added item to registry: ", stuff.data.transactionHash)
                                                resolve("Complete")
                                            })
                                            .catch(reject)
                                    })
                                    .catch(reject)
                            })
                            .catch(reject)
                    })
                    .catch(reject)
            })
            .catch(reject)
    })

}

const addItemToPlayer = async () => {
    return new Promise((resolve, reject) => {

        axios.get("http://127.0.0.1:3030/accounts/defaultAccount")
            .then((res) => {
                console.log("default account: " + res.data.payload)

                axios.post(url + "call", {
                        contract: "PlayerRegistry",
                        gas: 0,
                        id: "PlayerRegOne",
                        funcName: "getPlayerByAddress",
                        args: [res.data.payload],
                    })
                    .then((playerAddr) => {
                        console.log("player address: " + playerAddr.data)


                        axios.post(url + "call", {
                                contract: "NameRegistry",
                                gas: 0,
                                id: "ItemRegOne",
                                args: ["SexyItemTest"],
                                funcName: "getAddress"
                            })
                            .then(res3 => {

                                let itemAddr = res3.data
                                axios.post(url + "call", {
                                        contract: "Item",
                                        gas: 0,
                                        address: res3.data,
                                        args: [],
                                        funcName: "getOwner"
                                    })
                                    .then((res4) => {
                                        console.log("Item Owner: " + res4.data)
                                    })
                                    .catch(reject)
                                
                                axios.post(url + "call", {
                                    contract: "Player",
                                    gas: 50000000,
                                    address: playerAddr.data,
                                    args: ["ItemRegOne", "SexyItemTest"],
                                    funcName: "addItem"
                                })
                                .then((res)=>{
                                    console.log("added item to player")
                                    console.log(res.data)
                                    resolve(res.data)
                                })
                                .catch(reject)
                                
                            })
                            .catch(console.error)


                        axios.post(url + "call", {
                                contract: "Player",
                                gas: 0,
                                address: playerAddr.data,
                                args: [],
                                funcName: "getOwner"
                            })
                            .then((res4) => {
                                console.log("Player Registry: " + res4.data)
                            })
                            .catch(console.error)


                        axios.post(url + "call", {
                                contract: "Player",
                                gas: 0,
                                address: playerAddr.data,
                                args: [],
                                funcName: "getPlayerOwner"
                            })
                            .then((res4) => {
                                console.log("Player Owner: " + res4.data)
                            })
                            .catch(console.error)

                    })
            })
            .catch(console.error)
    })
}


const addRegistryToPlayerTest = () => {
    return new Promise(async (resolve, reject) => {

        const playerAddr = await getPlayerAddress()
        const itemRegAddr = await getItemRegAddress()
        console.log(itemRegAddr)
        console.log(playerAddr)

        addItemRegToPlayer = await axios.post(url + "call", {
                contract: "PlayerRegistry",
                gas: 50000000,
                id: "PlayerRegOne",
                args: [playerAddr, "ItemRegOne", itemRegAddr],
                funcName: "addItemRegistry"
            })
            .then((res) => {
                console.log("added ItemRegistry:ItemRegOne to player")
                resolve(res.data)
            })
            .catch(reject)
    })
}


const checkPlayer = async () => {
    
    const playerAddr = await getPlayerAddress()

    console.log(playerAddr)
    axios.post(url + "call", {
        contract: "Player",
        gas: 0,
        address: playerAddr,
        args: [],
        funcName: "getItems"
    })
    .then((res) => {
        console.log("Player's Items: " + res.data)
    })
    .catch(console.error)


} 

/*
deployRegistriesTest()
.then(deployItemRegistryTest)
.then(deployItemToRegistryTest)
.then(addRegistryToPlayerTest)
.then(addItemToPlayer)
.then(checkPlayer)
.catch(console.error)
*/