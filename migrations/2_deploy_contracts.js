/* eslint-disable no-undef */
const Token = artifacts.require("Token");
// const Xenon = artifacts.require("Xenon");
// const Neon = artifacts.require("Neon");
const Cryptonite = artifacts.require("Cryptonite");

module.exports = async function (deployer) {
  // DEPLOY TOKEN
  await deployer.deploy(Token);
  const token = await Token.deployed()

  // await deployer.deploy(Xenon);
  // const xenon = await Xenon.deployed()

  // await deployer.deploy(Neon);
  // const neon = await Neon.deployed()

  // DEPLOY Cryptonite
  await deployer.deploy(Cryptonite, token.address);
  const cryptonite = await Cryptonite.deployed()

  // Transfer all Tokens to Cryptonite
  await token.transfer(cryptonite.address, "1000000000000000000000000")
  // await xenon.transfer(cryptonite.address, "7000000000000000000000000")
  // await neon.transfer(cryptonite.address, "5000000000000000000000000")
};
