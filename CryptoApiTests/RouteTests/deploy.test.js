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
//player registry
/*
axios.post(url + "deploy",  {
    contract: "PlayerRegistry",
    gas:6999999,
    id: 1,
})
.then((res)=>{

    console.log(res.data)
})
.catch((err)=>{
    console.err(err)
})
*/

/*
    {
        funcName: "name",
        args: [],
        gas: "123",
        contract: "PlayerRegistry"
        id: 1 //optional or can use address
        value: 12333 //if function is payable
    }


axios.post(url + "getContractAddress",  {
    id: "PlayerRegOne"
})
.then((res)=>{
    axios.post(url + "call", {
        contract: "PlayerRegistry",
        gas: 5000000,
        address: res.data,
        args: [[10,10,10,10,10,11]],
        funcName: "newPlayer"
    })
    .then((res)=>{
        console.log(res.data)
    })
    .catch(console.error)
})
.catch(console.error)

*/


//is there a PlayerRegistry
axios.post(url + "call", 
{
    contract: "NameRegistry",
    gas: 0,
    id: "NameRegistry",
    args: ["PlayerRegOne"],
    funcName: "getAddress"
})
.then((res) => {

    axios.post(url + "call", 
    {
        contract: "PlayerRegistry",
        gas: 5000000,
        address: res.data,
        args: [[12, 12, 12, 12, 12, 12]],
        funcName: "newPlayer"
    })
    .then((res) => console.log(res.data))
    .catch(console.error)    
    
})
.catch(console.error)



//Full deployment 
/*
axios.post(url + "deploy", {
        contract: "PlayerRegistry",
        gas: 6999999,
        id: "PlayerRegOne",
    })
    .then((res) => {
        axios.post(url + "deploy",  {
            contract: "PlayerRegistry",
            gas:6999999,
            id: 1,
        })
        .then((res2)=>{
        
            axios.post(url + "call", 
            {
                contract: "NameRegistry",
                gas: 6999999,
                address: res.data,
                args: ["PlayerRegOne", res2.data],
                funcName: "addName"
            })
        .then(console.log)
        .catch(console.error)

        })
        .catch((err)=>{
            console.err(err)
        })
        
    })
    .catch((err) => {
        console.err(err)
    }) 
    
*/
