
This app is a work in progress, probably one of my most usefull ones to date. Basically, what it is a crypto wallet that can store and execute smart contracts.

It is desgined to be the backend of a wallet app, the idea is that other apps can call into it and use your keys to sign contracts transactions.
(it will ask you for authentication from standard in and out if you set that up in the conf.js file)

you can use it however you want, I wanted to give back to the Ethereum community a little bit with this, I'm not sure how
useful it will be in the futures, check out Cleff, it does a similar thing I think. But there are more devs on it than just me.


##API
you can use any http request client for these, the following api will be described 
with [TYPE of request, end point, parameters, what it returns ] send your requests to the
url "http://127.0.0.1:port or whatever it is listening to. All the parameters are application/type json.


Accounts:
url = http//127.0.0.1:port/accounts
GET [/getAccounts] [NoParams] returns a list of all encrypted keys, this is useful for exporting them, do so with the greatest of care, or returns error
GET [/getPublicAddresses] [NoParams] returns a list of all public address
GET [/defaultAddress] [NoParams] returns {action:"getDefault", payload: defaultAddress}
POST [/getBalances] [{'addresses':'[...0x1234, ...0x1234]'}] returns a list with the balances of all chosen accounts
POST [/newAccount] [{newAccount : {password: somevalue}}] returns a json object {action:"newAccount", payload: publicAddress}
POST [/deleteAccount][{deleteAccount:{account:"0x12345...", password: "somepassword"}}] returns {action:"deleteAccount", payload: addressDeleted}
POST [/changeDefault][{changeDefault:{account:"0x12345...", password: "somepassword"}}] returns {action:"changeDefault", payload: newDefaultAddress}

BlockChain
url = http://127.0.0.1:port/blockchain

POST [/getContractAddress] [{id:}] returns the contract address of the id you deployed it with
POST [/deploy][{}]
