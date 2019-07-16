const axios = require("axios")
const url = "http://127.0.0.1:3030/accounts/"

/*
// {newAccount: {password: somevalue}}
axios.post(url + "newAccount", {newAccount: {password:"pass1234"}})
.then((res)=>{
//{deleteAccount:{account:"0x12345...", password: "somepassword"}}});
    axios.post(url + "deleteAccount", {deleteAccount: {account:res.data.payload, password: "pass1234"}})
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
})
.catch((err) => {
  console.log(err)
})

*/
//get accounts, then get balances
/*
axios.get("http://127.0.0.1:3030/accounts/getPublicAddresses")
.then((res)=>{
   axios.post(url + "getBalances", {addresses:res.data})
  .then((res)=>{console.log(res.data)})
  .catch(console.log)
  
})
.catch((err)=>{
  console.log(err)
})
*/


axios.get("http://127.0.0.1:3030/accounts/getAccounts")
.then((res)=>{
  console.log(res.data)
  
})
.catch((err)=>{
  console.log(err)
})


axios.get(url + "defaultAccount")
.then((res)=>{
  console.log(res.data)
})
.catch(console.log)
