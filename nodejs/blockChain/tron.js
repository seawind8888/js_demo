const TronWeb = require('tronweb')

// This provider is optional, you can just use a url for the nodes instead
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.trongrid.io'); // Full node http endpoint
const solidityNode = new HttpProvider('https://api.trongrid.io'); // Solidity node http endpoint
const eventServer = new HttpProvider('https://api.trongrid.io'); // Contract events http endpoint

const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);




const address = 'TWUJjkwPiQpyzMLxEHztGMwPg7vtVT5tff';
async function getContract() {
    let list = await tronWeb.trx.getTransactionsRelated("TNDFkUNA2TukukC1Moeqj61pAS53NFchGF", "all", 30, 0)
    console.log({list})
}
getContract()
// tronWeb.trx.getContract(address,(err, trans) => {
//     console.log(trans)
// });