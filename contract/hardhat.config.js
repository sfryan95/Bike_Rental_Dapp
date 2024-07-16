require('@nomicfoundation/hardhat-ignition');
require('dotenv').config();

module.exports = {
  solidity: '0.8.24',
  networks: {
    testnet: {
      url: process.env.SECRET_URL,
      accounts: [process.env.SECRET_KEY],
      timeout: 180000, // Increase the timeout to 3 minutes
    },
  },
};
