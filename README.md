![Screenshot from 2022-09-18 00-32-53](https://user-images.githubusercontent.com/64158778/190878440-4944f648-4424-4780-a6af-5cebe600f7ec.png)
# Installation

Requirements:
  node version 18+

Install all npm packages used (hardhat, ethers, vite, dotenv, chakra, openzeppelin/contracts...etc)
```
npm install
```
Make sure node is version 18+
```
nvm use 18
```

# Smart contract deployment
Create a hardhat javascript project following the hardhat generation:
```
npx hardhat
```
Setup your .env file with:
- REACT_APP_RINKEBY_RPC_URL: Rpc endpoint of a Rinkeby node (e.g. with Infura)
- REACT_APP_ETHERSCAN_KEY: To perform smart contract code verification
- REACT_APP_PRIVATE_KEY: private key of the deploying account

Deploying the NFT smart contract:
```
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/deployRoboPunksNFT.js --network rinkeby
```
Save the contract's address.

Verifying the smart contract on etherscan:
```
npm i -D @nomiclabs/hardhat-etherscan
npx hardhat verify --network rinkeby [contract address]
```
Contract deployed previously: https://rinkeby.etherscan.io/address/0x84e9D8671Cbb7faECe8718f1c9f87B038aB4AE68#code
