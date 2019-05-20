import Web3 from 'web3';
import store from './store';

window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();

      // Acccounts now exposed
      let accounts = await window.web3.eth.personal.getAccounts();
      console.log(accounts[0]);

    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    let accounts = await window.web3.eth.personal.getAccounts();
    console.log(accounts[0]);
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
});
export default web3;
