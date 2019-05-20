const fs = require('fs');
const Web3 = require('web3');

const env = require('dotenv').config({ path : __dirname + '/.env' });

//Use Infuria Here
// Example: https://mainnet.infura.io/v3/<YOUR TOKEN>
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURIA));

const contractAddress = '0x2F4Bdafb22bd92AA7b7552d270376dE8eDccbc1E';
const contractABI = fs.readFileSync( __dirname + '/contractABI.js');

const Contract = web3.eth.Contract(JSON.parse(contractABI), contractAddress);

Contract.methods.ownerOf(1235).call()
  .then(console.log);
