const { assert } = require('chai');


/* eslint-disable no-undef */
const Token = artifacts.require("Token");
const Cryptonite = artifacts.require("Cryptonite");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract("Cryptonite", ([deployer, investor]) => {

    let token, cryptonite

    before(async () => {
        token = await Token.new()
        cryptonite = await Cryptonite.new(token.address)

        // Transfer all Token to Cryptonite (1 million)
        await token.transfer(cryptonite.address, tokens('1000000'))
    })

    describe('Token deployment', async () => {
        it('contract has a name', async () => {
            const name = await token.name()
            assert.equal(name, 'Krypton Token')
        })
    })


    describe('Cryptonite deployment', async () => {
        it('contract has a name', async () => {
            const name = await cryptonite.name()
            assert.equal(name, 'Cryptonite DEX')
        })

        it('contract has token', async () => {
            let balance = await token.balanceOf(cryptonite.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })
    // Purchase tokens before each example
    describe('buyTokens()', async () => {
        let result

        before(async () => {

            result = await cryptonite.buyTokens({ from: investor, value: web3.utils.toWei('1', 'ether') })
        })
        it('Allows user to instantly purchase tokens from Cryptonite for a fixed price', async () => {
            // check investor token balance after purchase
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('100'))
            // Check cryptonite balance after purchase
            let cryptoniteBalance
            cryptoniteBalance = await token.balanceOf(cryptonite.address)
            assert.equal(cryptoniteBalance.toString(), tokens('999900'))
            cryptoniteBalance = await web3.eth.getBalance(cryptonite.address)
            assert.equal(cryptoniteBalance.toString(), web3.utils.toWei('1', 'Ether'))

            // Check logs to ensure event was emitted with correct data
            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100'.toString()))
            assert.equal(event.rate.toString(), '100')

        })

    })

    // Sell tokens
    describe('sellTokens()', async () => {
        let result

        before(async () => {

            //Investor must approve tokens before the purchase
            await token.approve(cryptonite.address, tokens('100'), { from: investor })
            // Investor sell tokens
            result = await cryptonite.sellTokens(tokens('100'), { from: investor })
        })
        it('Allows user to instantly Sell tokens to Cryptonite for a fixed price', async () => {
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('0'))

            // Check cryptonite balance after purchase
            let cryptoniteBalance
            cryptoniteBalance = await token.balanceOf(cryptonite.address)
            assert.equal(cryptoniteBalance.toString(), tokens('1000000'))
            cryptoniteBalance = await web3.eth.getBalance(cryptonite.address)
            assert.equal(cryptoniteBalance.toString(), web3.utils.toWei('0', 'Ether'))

            // Check logs  to ensure event was emitted with correct data
            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100'.toString()))
            assert.equal(event.rate.toString(), '100')

            // Failure: Investor can't sell more token than they have
            await cryptonite.sellTokens(tokens('500'), { from: investor }).should.be.rejected;

        })

    })


})