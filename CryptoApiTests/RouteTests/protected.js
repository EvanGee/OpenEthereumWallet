const axios = require("axios");
const url = "http://127.0.0.1:3030/protected/";

//axios.get(url)
//.then((res)=>console.log(res.data))
//.catch(console.error);
axios.get(url+"getCurrentProvider").then((res)=>{
    console.log(res.data)
})
.catch((err)=>console.error("shit"))


//fails
axios.post(url + "changeProvider", {"stuff": "sending"})

.then((res)=>console.log(res.data))
.catch(console.error);

//success
axios.post(url + "changeProvider", {"newProvider": "http://127.0.0.1:8555"})

.then((res)=>{
 
    console.log(res.data)
    axios.get(url+"getCurrentProvider").then((res)=>{
        console.log(res.data)
    })
    .catch((err)=>console.error("shit"))
})
.catch((err)=>{

    console.error("couldn't changeProvider")
});
