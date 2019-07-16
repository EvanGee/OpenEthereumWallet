

const authLib = require("../../nodejs-assets/nodejs-project/CryptoApi/Auth")
const auth = new authLib()

test("storePassword", () => {
    auth.storePassword("stuff").then((res)=>{
        expect(res).toEqual(true);
    })
    .catch((err)=>{
        expect(err).toEqual(false)
    })
})


test("compare", () => {
    auth.compare("stuff").then((res)=>{
        expect(res).toEqual(true)
    })
})
