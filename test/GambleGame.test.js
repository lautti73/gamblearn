const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3( provider );

const compiledFactory = require("../ethereum/build/GambleGameFactory.json");
const compiledGambleGame = require("../ethereum/build/GambleGame.json");

let accounts;
let factory;
let gambleGameAddress;
let gambleGame;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
  
    factory = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
      .send({ from: accounts[0], gas: "2500000" });

      await factory.methods.createGambleGame("arg", "br", "partido de futbol").send({
        from: accounts[0],
        gas: "2500000"
    });

    [gambleGameAddress] = await factory.methods.getDeployedGambleGames().call();
    gambleGame = await new web3.eth.Contract(compiledGambleGame.abi, gambleGameAddress);
  });

  
describe("GambleGames", () => {
    it("deploys a factory and a gamble game", () => {
      assert.ok(factory.options.address);
      assert.ok(gambleGame.options.address);
    });

})