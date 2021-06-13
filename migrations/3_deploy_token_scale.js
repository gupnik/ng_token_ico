const NGToken = artifacts.require("NGToken");
const NGTokenSale = artifacts.require("NGTokenSale");

module.exports = async function (deployer) {
  token = await NGToken.deployed();
  await deployer.deploy(NGTokenSale, token.address, 0.001 * 1000000000000000000);
};
