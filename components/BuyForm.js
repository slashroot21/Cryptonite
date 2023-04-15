import React, { Component } from 'react';
import ReactSelect from 'react-select';
// import 'react-select/dist/react-select.css';

//Chakra-UI IMPORTS
import { Stack, Image, Flex, Container, HStack, Box, NumberInput, Input, Button, Text, } from '@chakra-ui/react';


class BuyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0.0',
      token: 'Krypt',
      balance: window.web3.utils.fromWei(props.tokenBalance, 'Ether'),
      rate: '100'
    }
  }

  handleChange = (event) => {
    this.setState({ token:  event.label, balance: event.balance, rate:event.rate});
    console.log(this.state.token, this.state.balance,this.state.rate)
  }


  render() {
    const tokenList = [
      { value: 'Krypton', label: 'Krypt', image: "https://i.pinimg.com/originals/53/54/3f/53543f3e66404ff124ee38654ee128ff.jpg", balance: window.web3.utils.fromWei(this.props.tokenBalance, 'Ether'), rate: '100'},
      { value:'Neon', label: 'Neon', image: "https://t4.ftcdn.net/jpg/04/61/15/19/360_F_461151906_tOlOeEqCwWtvPR1UY0BCSJQTCr3O4SLK.jpg", balance: '25',rate: '125'},
      {value: "Xenon", label: "Xenon", image: "https://images.unsplash.com/photo-1654020233909-bcbd71d2ebc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Nnx8fGVufDB8fHx8&w=1000&q=80", balance: '60',rate: '160'}
    ];

    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        if(this.state.token==="Krypt") {
          let etherAmount
          etherAmount = this.input.value.toString()
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          this.props.buyTokens(etherAmount)
        }
        else {
          console.log(parseInt(this.state.balance), parseInt(this.state.rate), parseInt(this.input.value))
          this.setState({balance: ('' + (parseInt(this.state.balance) + parseInt(this.state.rate)*this.input.value))})
        }
        
      }} >

        <Stack spacing={1}>
          {/* TokenList and PriceList Section 1 */}
          <Container
            borderColor="gray.700"
            borderWidth={1}
            borderRadius={20}
            paddingBlock={4}
            bgColor='gray.800'
            _hover={{ bg: 'gray.700' }}
          >
            <HStack spacing={20} >
              {/* TokenList selection Section 1 */}
              <Container
                bgColor='gray.600'
                borderWidth={1}
                borderRadius={20}
                borderColor="gray.500"
                paddingBlock={1}
                height={12}
                width="13rem"
                as={Button}
                _hover={{ bg: 'gray.900' }}
              >
                <Flex>
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src="https://res.cloudinary.com/teepublic/image/private/s--UbaxRjB3--/c_crop,x_10,y_10/c_fit,h_830/c_crop,g_north_west,h_1038,w_1038,x_-264,y_-104/l_upload:v1565806151:production:blanks:vdbwo35fw6qtflw9kezw/fl_layer_apply,g_north_west,x_-375,y_-215/b_rgb:262c3a/c_limit,f_jpg,h_630,q_90,w_630/v1470823069/production/designs/625723_1.jpg"
                    alt="Eth"
                    mr="2px"
                  />
                  <Box paddingTop="2" ml="1">
                    <Text
                      color="white"
                      fontSize="sm"
                      fontWeight="bold">
                      ETH
                    </Text>
                  </Box>
                </Flex>
              </Container>

              {/* TokenList input Section 1 */}

              <NumberInput
                borderColor="gray.700"
                maxW="140px"
                mr="2rem"
              >
                <Input
                  color="gray.200"
                  type="number"
                  placeholder="0.0"
                  onChange={(event) => {
                    const etherAmount = this.input.value.toString()
                    this.setState((prevState)=> ({
                      output: etherAmount * parseInt(prevState.rate)
                    }))
                  }}
                  ref={(input) => { this.input = input }}
                />
                <Text fontSize='small' color="white" letterSpacing={1} as="samp">Bal:{window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}</Text>
              </NumberInput>
            </HStack>
          </Container>


          {/* TokenList and PriceList Section 2 Cryptonite */}
          <Container
            borderColor="gray.700"
            borderWidth={1}
            borderRadius={20}
            paddingBlock={4}
            bgColor='gray.800'
            _hover={{ bg: 'gray.700' }}
          >
            <HStack spacing={20} >
              {/* TokenList selection Section 2 */}
                <ReactSelect
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: "#505570",
                      borderWidth: "1px",
                      borderRadius: "20px",
                      borderColor: "#9E9E9E",
                      paddingBlock: "1px",
                      height: "3rem",
                      width: "9rem",
                      '&:hover': {
                        backgroundColor: '#212121'
                      }
                    }),
                    option: (baseStyles,state) => ({
                      ...baseStyles,
                      backgroundColor: "#505570",
                      '&:hover': {
                        backgroundColor: '#212121'
                      }
                    })
                  }}
                  onChange={this.handleChange}
                  defaultValue={tokenList[0]}
                  options={tokenList}
                  formatOptionLabel={token => (
                    <Flex>
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={token.image}
                        alt={token.label}
                        mr="2px"
                      />
                      <Box paddingTop="2" ml="1">
                        <Text
                          color="white"
                          fontSize="sm"
                          fontWeight="bold">
                          {token.label}
                        </Text>
                      </Box>
                    </Flex>
                  )}
                />  
              {/* TokenList Output Section 2 */}
              <NumberInput
                borderColor="gray.700"
                maxW="200px"
                mr="2rem"
              >
                <Input
                  color="gray.200"
                  type="number"
                  placeholder="0.0"
                  value={this.state.output}
                  disabled
                />
                <Text fontSize="small" color="white" as="samp" letterSpacing={1}>Balance:{this.state.balance}</Text>
              </NumberInput>
            </HStack>
          </Container>






          {/* Price Rate comparison Section */}
          <Stack spacing={3}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Text as="samp" color="white" fontSize="small" letterSpacing={0.5}>Exchange Rate</Text>
              <Text as="samp" fontSize="small" color={'red.400'}>1 ETH = {this.state.rate} {this.state.token}</Text>
            </Stack>

            {/* Krypt Swapping Button Section*/}
            <Button
              type="submit"
              bg={'purple.500'}
              color={'white'}
              _hover={{
                bg: 'purple.800',
              }}
              borderRadius={20}
              height={65}
              textColor="purple.100"
              fontWeight="bold"
            >Swap
            </Button>
          </Stack>
        </Stack>
      </form>
    );
  }
}

export default BuyForm;
