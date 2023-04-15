import React, { Component } from 'react';
import Web3 from 'web3';

// Contract import
import Token from '../build/contracts/Token.json';
import Cryptonite from '../build/contracts/Cryptonite.json';

import { Center,  Stack, Button, Text, } from '@chakra-ui/react';

import Header from '../components/Header';
import Main from '../components/main';



class Home extends Component {

  // Web3 enable the app to connect the blockchain
  async componentDidMount() {
    await this.loadWeb3()
    // await this.loadBlockchainData()
  }

  // 1- loading the blockchain the on the Ui
  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    // 2- loading the Token Interface on the UI
    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      this.setState({ tokenBalance: tokenBalance.toString() })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }

    // 2- loading the Cryptonite Interface on the UI
    const cryptoniteData = Cryptonite.networks[networkId]
    if (cryptoniteData) {
      const cryptonite = new web3.eth.Contract(Cryptonite.abi, cryptoniteData.address)
      this.setState({ cryptonite })
    } else {
      window.alert('Cryptonite contract not deployed to detected network.')
    }

    this.setState({ loading: false })
    this.setState({ firstLoad: false })

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  buyTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.cryptonite.methods.buyTokens()
      .send({ value: etherAmount, from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
  }

  sellTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.cryptonite.address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.cryptonite.methods.sellTokens(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      cryptonite: {},
      ethBalance: '0',
      tokenBalance: '0',
      loading: true,
      firstLoad: true

    }
  }


  render() {
    let content
    if (this.state.loading) {
      if (this.state.firstLoad) {
        content = <Button
          borderWidth={1}
          borderColor="purple.500"
          textColor="purple.500"
          bgColor='gray.900'
          _hover={{
            bg: 'purple.100',
          }}
          onClick={async () => { await this.loadBlockchainData() }}
        >connect wallet
        </Button>
      } else {
        content = <Text id="loader">Loading...</Text>
      }
    } else {
      content = <Main
        ethBalance={this.state.ethBalance}
        tokenBalance={this.state.tokenBalance}
        buyTokens={this.buyTokens}
        sellTokens={this.sellTokens}
      />
    }

    return (
      // App Landing Page      
      <Center flex align={'center'} bg={('gray.50', 'gray.800')} flexWrap="wrap" marginBottom="25" >
        {/*Information, ConnectWallet-Button and Network Section */}
        <Stack spacing={7} mx={'auto'} maxW={'lg'} py={20} pl="10" pr="5">  {/* Trading Platform Header  */}
          <Header account={this.state.account} ethBalance={this.state.ethBalance} /> {/* App Title and Heading Section */}
          {content}                                                 {/* DEX Swapping Platform as Main Section  */} {/* Buy and Sell Buttons Section */}
        </Stack>
      </Center>
    );
  }
}

export default Home;