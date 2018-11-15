const axios = require("axios")

'{"jsonrpc":"2.0","method":"clique_discard","params":[],"id":1}'
'{"jsonrpc":"2.0","method":"clique_getProposals","params":[],"id":1}'
'{"jsonrpc":"2.0","method":"clique_getSigners","params":[],"id":1}'
'{"jsonrpc":"2.0","method":"clique_getSignersAtHash","params":[],"id":1}'
'{"jsonrpc":"2.0","method":"clique_getSnapshot","params":[],"id":1}'
'{"jsonrpc":"2.0","method":"clique_getSnapshotAtHash","params":[],"id":1}'
'{"jsonrpc":"2.0","method":"clique_propse","params":[],"id":1}'


const authOptions = (host) => ({
    method: 'GET',
    url:host,
    data: "",
    headers: {
        'Content-Type': 'application/json'
    },
    json: true
  });


//needs an http request not a websocket
const getSigners = (web3) => {
    var request = authOptions(web3.currentProvider.host)
    request.data = {"jsonrpc":"2.0","method":"clique_getSigners","params":[],"id":1}
    return axios(request)
}


module.exports = {
    getSigners
}