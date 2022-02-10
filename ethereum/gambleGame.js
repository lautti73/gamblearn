import web3 from "./web3";
import GambleGame from './build/GambleGame.json'

const Gamble = gambleAddress => new web3.eth.Contract( GambleGame.abi, gambleAddress );

export default Gamble;