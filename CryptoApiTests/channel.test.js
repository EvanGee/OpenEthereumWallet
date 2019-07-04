
const channelTests = require("../../nodejs-assets/nodejs-project/main")


function myFunc(arg) {
 const msg = {transaction: {to: "343290ccfc13ce5e7975cb511c913d6604da0244", value: 100000, gas: 8000000}}
 channelTests.handleMessages(JSON.stringify(msg))

 //const msg = {changeDefault: { account: "3779f2780c4b889c64a5c485df657104409c3e45", password: "12345"}}
 //channelTests.getDefaultAccount({getDefaultAccount: ""})
 //channelTests.changeDefaultAccount(msg)
}

function bar() {
  channelTests.getDefaultAccount({getDefaultAccount: ""})
}

setTimeout(myFunc, 3000, 'funky');
//setTimeout(bar, 3000, "stuff")

//channelTests.checkParsingFail(msg)

//{deleteAccount:{changeDefault:"0x12345...", password: "somepassword"}}});

/*
test('checkParsingChannelInputFail', () => {
    let data = {"asdf": "asd"}
    expect(channelTests.checkParsingFail(data)).toEqual(false);

  });

test('checkParsingChannelInputSuccess', () => {
    let data = {"asdf": "asd"}
    data = JSON.stringify(data)
    expect(channelTests.checkParsingFail(data)).toEqual(true);

  });

test("checkCreateNewAccountFail", ()=> {

    let data = {"newAccount": "123456"}
    expect(channelTests.newAccount(data)).toEqual(false);
})

//{newAccount: {newAccount: {password: somevalue}}
test("checkCreateNewAccountSuccess", ()=> {

  let data = {"newAccount": {password: "12345"}}
  expect(channelTests.newAccount(data)).toEqual(true);
})


test("deleteAccountFail", () => {
  
})

*/