const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('CycleLinkModule', (m) => {
  // Deploy the CycleLink contract
  const cycleLink = m.contract('CycleLink');

  return { cycleLink };
});
