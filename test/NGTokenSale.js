const NGTokenSale = artifacts.require("NGTokenSale");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("NGTokenSale", function (accounts) {
  let tokenSaleInstance;
  let tokenPrice = 0.001 * 1000000000000000000; //in wei

  it("initializes the contract with correct values", async function () {
    tokenSaleInstance = await NGTokenSale.deployed();
    assert.notEqual(tokenSaleInstance.address, 0x0, 'has contract address');

    tokenContract = await tokenSaleInstance.tokenContract();
    assert.notEqual(tokenContract.address, 0x0, 'has token contract address');

    price = await tokenSaleInstance.tokenPrice();
    assert.equal(price, tokenPrice, 'token price is correct');
  });
});
