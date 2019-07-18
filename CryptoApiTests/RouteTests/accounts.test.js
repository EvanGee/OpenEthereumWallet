const axios = require("axios")
const url = "http://127.0.0.1:3030/accounts/"


axios.get(url + "newAccount")
.then((res)=>{
//{deleteAccount:{account:"0x12345..."});
    axios.post(url + "deleteAccount", {address:res.data.payload})
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


//get addresses, then get balances
axios.get("http://127.0.0.1:3030/accounts/getPublicAddresses")
.then((res)=>{

   axios.post(url + "getBalances", {addresses:res.data.payload})
  .then((res)=>{console.log(res.data)})
  .catch(console.log)
  
})
.catch((err)=>{
  console.log(err)
})


//get private keys
axios.get("http://127.0.0.1:3030/accounts/getAccounts")
.then((res)=>{
  console.log(res.data)
  
})
.catch((err)=>{
  console.log(err)
})

//get default
axios.get(url + "defaultAddress")
.then((res)=>{
  console.log(res.data)
})
.catch(console.log)


//get addresses
axios.get(url+"getPublicAddresses")
.then((res)=>{
  console.log(res.data)
  
  axios.post(url + "changeDefault", {address: 
    res.data.payload[1]
  })
  .then(()=>{
    axios.get(url + "defaultAddress")
    .then((res)=>{
      console.log(res.data)
    })
    .catch(console.log)

  })
  .catch(console.error)
  
})
.catch((err)=>{
  console.log(err)
})
