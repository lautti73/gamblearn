import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';
 
let web3;

 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {

  
  const provider = await detectEthereumProvider({
    mustBeMetaMask: true
  });

  if (provider) {
    startApp(provider);
  } else {
    console.log('Please install MetaMask!');
  }

  function startApp(provider) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    } else {
      web3 = new Web3(provider)
    }
    // Access the decentralized web!
  }

  ethereum.on('chainChanged', reloadPage);
  ethereum.on("disconnect", reloadPage);
  ethereum.on('accountsChanged', reloadPage );

  function reloadPage() {
    window.location.reload();
  }

  console.log('se ejecuta el web3 en el cliente')


} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/971744bb115946f59bb8767d2d6bea02'
  );
  web3 = new Web3(provider);

}




export default web3;

