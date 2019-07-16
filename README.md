
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
it will return json for most of the responses 
In the future I want to make everything returns {action, payload} format, so it is easy to structure
in a front end application


## Accounts:  
url = http//127.0.0.1:port/accounts  
### GET __**/getAccounts**__  
Paramaters: None  
returns: a list of all encrypted keys, this is useful for exporting them, do so with the greatest of care.  

### GET __**/getPublicAddresses**__   
Paramaters: None  
returns: a list of all public address  

### GET __**/defaultAddress**__  
Paramaters: None  
returns: {action:"getDefault", payload: defaultAddress}  

### POST __**/getBalances**__   
Paramaters: 
```
{
'addresses':'[...0x1234, ...0x1234]'
}
```
returns: a list with the balances of all chosen accounts  

### POST __**/newAccount**__  
Paramaters: 
```
{
newAccount : {
    password: somevalue
    }
}
```
returns: {action:"newAccount", payload: publicAddress}  

### POST __**/deleteAccount**__  
Paramaters: 
```
{
deleteAccount: {
    account:"0x12345...", 
    password: "somepassword"
    }
}
```
returns: {action:"deleteAccount", payload: addressDeleted}  

### POST __**/changeDefault**__   
Paramaters: 
```
{
changeDefault: {
    account:"0x12345...", 
    password: "somepassword"
    }
}
```
returns: {action:"changeDefault", payload: newDefaultAddress} 
## BlockChain  
url = http://127.0.0.1:port/blockchain

### POST /getContractAddress  
Paramaters: 
```
{
    id: "123..."
}
```
returns: the contract address of the id you deployed it with  

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
returns: the address of the deployed contract  

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
returns the transaction object
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
returns {events}  
  
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
returns amount in wei  

## Protected
url = http://127.0.0.1:port/protected


### POST /changeProvider
Paramaters: 
```
{
    newProvider: "http://newProvider:8454"
}
```
returns {provider: newProvider}

### GET /getCurrentProvider
Paramaters: None
returns {provider: currentProvider}

### POST /send
Parameters: 
```
    to: "0x123...",
    from: "0x123...",
    value: 1234..., //in wei
    gas: 21000
```
returns: transaction object
