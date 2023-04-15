import React, { Component } from 'react'
import { Stack, Heading, Text } from '@chakra-ui/layout'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      ethBalance: '0'
    }
  }

  render() {
    const mystyle = {
      fontWeight: "bold",
      marginBottom: 15,
      fontFamily: "Montserrat",

    };

    return (
      <Stack align={'center'} >
        <Heading color='white' fontSize={'4xl'} style={mystyle}>Cryptonite</Heading>
        <Text as="samp" color={'gray.400'} letterSpacing={1}
        >{this.props.account}
        </Text>
        <Text as="samp" color={'gray.400'} letterSpacing={1} style={mystyle}
        >Wallet Balance:{this.props.ethBalance}</Text>
      </Stack>
    )
  }
}
export default Header
