const path = require('path');
const solc = require('solc');
const fs = require( 'fs-extra');

const buildPath = path.resolve( __dirname, 'build');
const contractFileName = 'GambleGame.sol';
fs.removeSync(buildPath);

const gambleGamePath = path.resolve( __dirname, 'contracts', contractFileName );
const source = fs.readFileSync( gambleGamePath, 'utf8'  );

const input = {
    language: "Solidity",
    sources: {},
    settings: {
      metadata: {
        useLiteralContent: true,
      },
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  
  input.sources[contractFileName] = {
    content: source,
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contracts = output.contracts[contractFileName];

  fs.ensureDirSync(buildPath);

  for (let contract in contracts) {
    if (contracts.hasOwnProperty(contract)) {
      fs.outputJsonSync(path.resolve(buildPath, `${contract}.json`), contracts[contract]);
    }
  }