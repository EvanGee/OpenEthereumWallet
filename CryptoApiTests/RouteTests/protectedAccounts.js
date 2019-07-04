const axios = require("axios")



/*
axios.get("http://127.0.0.1:3030/getCurrentProvider", {"newProvider": ""})
.then((res)=>{
  console.log(res.data)
})
.catch((err)=>{
  console.log(err)
})
*/

axios.get("http://127.0.0.1:3030/accounts/getPublicAddresses")

.then((res)=>{

   axios.post("http://127.0.0.1:3030/accounts/getBalances", {addresses:res.data})
  .then((res)=>{console.log(res.data)})
  .catch(console.log)
  
})
.catch((err)=>{
  console.log(err)
})



/*
axios.post("http://127.0.0.1:3030/accounts/getBalances", {addresses:["0x0bc40dF1d248f4d9B2cB7629afDB89780403C6eD"]})
.then((res)=>{console.log(res.data)})
.catch(console.log)


/*

auth.getPassword().then((pass)=>{
    console.log("sending pass: ", pass)
    axios.get("http://127.0.0.1:3030/protected/accounts",  {
        params: {
          auth: pass
        }
      }
    )
})


//axios.post("http://127.0.0.1:3030/protected/accounts", encryptedPass)
*/
