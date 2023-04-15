import { Box } from '@chakra-ui/layout';
import { ChakraProvider } from "@chakra-ui/react"
import Navbar from '../components/Navbar';
import "react-alice-carousel/lib/alice-carousel.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Box bg="gray.800" >
        <Navbar />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
