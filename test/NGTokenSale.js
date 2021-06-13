const NGToken = artifacts.require("NGToken");
const NGTokenSale = artifacts.require("NGTokenSale");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("NGTokenSale", function (accounts) {
  let tokenInstance;
  let tokenSaleInstance;
  let admin = accounts[0];
  let buyer = accounts[1];
  let tokenPrice = 0.001 * 1000000000000000000; //in wei
  let tokensAvailable = 5000;

  it("initializes the contract with correct values", async function () {
    tokenSaleInstance = await NGTokenSale.deployed();
    assert.notEqual(tokenSaleInstance.address, 0x0, 'has contract address');

    tokenContract = await tokenSaleInstance.tokenContract();
    assert.notEqual(tokenContract.address, 0x0, 'has token contract address');

    price = await tokenSaleInstance.tokenPrice();
    assert.equal(price, tokenPrice, 'token price is correct');
  });

  it("facilitates token buying", async function() { 
    tokenInstance = await NGToken.deployed();
    tokenSaleInstance = await NGTokenSale.deployed();

    receipt = await tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, { from: admin });

    const numberOfTokens = 10;
    const value = numberOfTokens * tokenPrice;
    receipt = await tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: value });
    assert.equal(receipt.logs.length, 1);
    assert.equal(receipt.logs[0].event, "Sell");
    assert.equal(receipt.logs[0].args._buyer, buyer);
    assert.equal(receipt.logs[0].args._amount, numberOfTokens);

    tokenSold = await tokenSaleInstance.tokensSold();
    assert.equal(tokenSold.toNumber(), numberOfTokens, 'increments the number of tokens sold');

    tokenSaleBalance = await tokenInstance.balanceOf(tokenSaleInstance.address);
    assert.equal(tokenSaleBalance.toNumber(), tokensAvailable - numberOfTokens);

    buyerBalance = await tokenInstance.balanceOf(buyer);
    assert.equal(buyerBalance.toNumber(), numberOfTokens);

    thrown  = false; 
    try {
      await tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 });
    } catch (error) {
      thrown = true;
      assert(error.message.indexOf("revert") >= 0, "msg.value must equal number of tokens in wei");
    }
    assert.equal(thrown, true);

    thrown  = false; 
    try {
      await tokenSaleInstance.buyTokens(6000, { from: buyer, value: 6000 * tokenPrice });
    } catch (error) {
      thrown = true;
      assert(error.message.indexOf("revert") >= 0, "cannot purchase more tokens than available");
    }
    assert.equal(thrown, true);
  });
});
