
This app is a work in progress, probably one of my most usefull ones to date. Basically, what it is a crypto wallet that can store and execute smart contracts.

It is desgined to be the backend of a wallet app, the idea is that other apps can call into it and use your keys to sign contracts transactions.
(it will ask you for authentication from standard in and out if you set that up in the conf.js file)

you can use it however you want, I wanted to give back to the Ethereum community a little bit with this, I'm not sure how
useful it will be in the futures, check out Cleff, it does a similar thing I think. But there are more devs on it than just me.


# running 
I have node 8.10
```
$npm install
$node App.js
```

# API
Parameters are the application-type/json body of your request
every api responses includes a json string "{action:endpoint, payload:response} format, so it is easy to structure
in a front end application, like if you were using React/redux for instance


## Accounts:  
url = http://127.0.0.1:port/accounts  
### GET __**/getAccounts**__  
Paramaters: None  
returns: {action:"getAccounts", payload: [accounts]}

### GET __**/getPublicAddresses**__   
Paramaters: None  
returns: {action: "getPublicAddresses", payload: [addresses]}

### GET __**/defaultAddress**__  
Paramaters: None  
returns: {action:"getDefault", payload: defaultAddress}  
  
### GET __**/newAccount**__  
Paramaters: None  
returns: {action:"newAccount", payload: address}  
  
### POST __**/getBalances**__   
Paramaters: 
```
{
    'addresses':'[...0x1234, ...0x1234]'
}
```
returns: {action:"getBalances", payload: [{publicAddress:balanace:]} 

### POST __**/deleteAccount**__  
Paramaters: 
```
{
    account:"0x12345..."
}
```
returns: {action:"deleteAccount", payload: addressDeleted}  

### POST __**/changeDefault**__   
Paramaters: 
```
{
    address:"0x12345..."
}
```

returns: {action:"changeDefault", payload: newDefaultAddress} 
  
### POST /send  
Parameters: 
```
    to: "0x123...",
    from: "0x123...",
    value: 1234..., //in wei
    gas: 21000
```
returns: {action: "send", payload: transaction}

## BlockChain  
url = http://127.0.0.1:port/blockchain

### POST /getContractAddress  
Paramaters: 
```
{
    id: "123..."
}
```
returns: {action:"getContractAddress", payload:address}

### POST /deploy  
Paramaters:  
```  
{  
    contract: "ContractName",  
    gas: '50000'  
    id: '123' // this is can be used to get the address later, remember what ID you set it as   
    args: [] //optional, these are your arguments to the constructor    
}
 ```    
returns: {action:"deploy", payload:addressOfDeployedContract}

### POST /call  
Parameters: 
```
{   
    funcName: "functionName",  
    args: [], //these are your arguements to your function  
    gas: "50000",  
    contract: "ContractName"  
    id: "123" //optional or can use address instead, need etiher id or address  
    address: "0x1234...."",  
    value: 12333 //if function call is payable 
}
```
returns: {action: "call", payload: transaction}  

### POST /getEvents  
(this one is yet to be tested and implmented fully)  
Parameters: 
```
{  
    contract: "ContractName"  
    id: "123" //optional or can use address instead, need etiher id or address  
    address: "0x1234...."",  
    fromBlock: 0,  
    toBlock: "latest",  
}
```  
returns: {action: getEvents, payload: [events]}  
  
### POST /estimate  
(this one is yet to be tested and implmented fully)  
Parameters: 
```  
{  
    funcName: "functionName",  
    args: [], //these are your arguements to your function  
    gas: "50000",  
    contract: "ContractName"  
    id: "123" //optional or can use address instead, need etiher id or address  
    address: "0x1234...."",  
}
```  
returns: {action: getEvents, payload: [events]}  

## Net
url = http://127.0.0.1:port/net

### POST /changeProvider
Paramaters: 
```
{
    newProvider: "http://newProvider:8454"
}
```  
returns {actions: 'changeProvider', payload: currentProvider})

### GET /getCurrentProvider
Paramaters: None  
returns {actions: 'changeProvider', payload: currentProvider})


