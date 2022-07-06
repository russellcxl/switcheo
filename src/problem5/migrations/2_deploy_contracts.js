var Reader = artifacts.require("./Reader.sol");

module.exports = function(deployer) {
  deployer.deploy(Reader);
};