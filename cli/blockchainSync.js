const fs = require('fs');
const Web3 = require('web3');

const env = require('dotenv').config({ path : __dirname + '/.env' });

//Use Infuria Here
// Example: https://mainnet.infura.io/v3/<YOUR TOKEN>
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURIA));

const contractAddress = '0x2F4Bdafb22bd92AA7b7552d270376dE8eDccbc1E';
const contractABI = fs.readFileSync( __dirname + '/contractABI.js');

const Contract = web3.eth.Contract(JSON.parse(contractABI), contractAddress);

//This is a link to the public methods
//https://etherscan.io/address/0x2F4Bdafb22bd92AA7b7552d270376dE8eDccbc1E#readContract

const startWizardId = 1235;

Contract.methods.nextWizardId().call()
  .then( x => {
    return web3.utils.hexToNumber(x);
  })
  .then(maxWizardId => {
    let promises = [];

    for (let x=startWizardId; x<maxWizardId; x++) {
      promises.push(
        Contract.methods.getWizard(x).call()
          .then(record => {
            return processBlockchainRecord(record);
          })
      );
    }

    return Promise.all(promises);
  })
  .then((records) => {
      records.forEach(record => {
        //Process Record
        console.log(record);
      });
  });


/**
 *
 * @param record
 * @return {{owner: *, affinity: (string|void), power: string}}
 */
function processBlockchainRecord(record) {
  return {
    owner : record.owner,
    affinity : translateAffinity(record.affinity),
    power : record.power.toString()
  }
}

/**
 *
 * @param affinity
 * @return {string}
 */
function translateAffinity(affinity) {
  if (affinity === 1) {
    return 'neutral';
  } else if (affinity === 2) {
    return 'fire';
  } else if (affinity === 3) {
    return 'wind';
  } else if (affinity === 4) {
    return 'water';
  }
}
