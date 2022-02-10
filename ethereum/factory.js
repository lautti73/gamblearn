import web3 from "./web3";
import GambleGameFactory from './build/GambleGameFactory.json'

const instance = new web3.eth.Contract(
    GambleGameFactory.abi,
    '0xbA7220fA6b42FBad11A6Bb1d1445B64b0b0109a6'
)

export default instance;