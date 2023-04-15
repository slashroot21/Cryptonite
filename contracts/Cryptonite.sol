pragma solidity ^0.5.0;

import './Token.sol';
// import './Xenon.sol';
// import './Neon.sol';

contract Cryptonite {
   string public name = "Cryptonite DEX";
   Token public token;
//    Xenon public xenon;
//    Neon public neon;
   uint public trate = 100;
//    uint public xrate = 50;
//    uint public nrate = 3;

  address payable owner;
  uint256 listingPrice = 0.035 ether;

   event TokensPurchased(
       address account,
       address token,
       uint amount,
       uint rate
   );

    event TokensSold(
       address account,
       address token,
       uint amount,
       uint rate
   );

   constructor(Token _token) public {
        // xenon=_xenon;
        // neon=_neon;
        token = _token;
   }

  // ---------------------------Buying Krypton Token function--------------------------
   function buyTokens() public payable {
       // Calculate the number of token to buy
       uint tokenAmount = msg.value * trate;

        //Require that Cryptonite has enough tokens
       require(token.balanceOf(address(this)) >= tokenAmount);

        // transfers tokens to the user 
       token.transfer(msg.sender, tokenAmount);

       //Emit an event
       emit TokensPurchased(msg.sender, address(token), tokenAmount, trate);
   }

   // Selling Krypton Tokens Function
   function sellTokens(uint _amount) public {
       //User can't sell more tokens than they have
       require(token.balanceOf(msg.sender) >= _amount);

       //Calculate the Amount of Ether to redeem
       uint etherAmount = _amount / trate;

       //Require that Cryptonite has enough Ether
       require(address(this).balance >= etherAmount);

       //Perform sales
       token.transferFrom(msg.sender, address(this), _amount);
       msg.sender.transfer(etherAmount); 

       //Emit an event
       emit TokensSold(msg.sender, address(token), _amount, trate);
   }

//     // --------------------------Buying Xenon Token function--------------------------
//    function buyXenons() public payable {
//        // Calculate the number of token to buy
//        uint xenonAmount = msg.value * xrate;

//         //Require that Cryptonite has enough tokens
//        require(xenon.balanceOf(address(this)) >= xenonAmount);

//         // transfers tokens to the user 
//        xenon.transfer(msg.sender, xenonAmount);

//        //Emit an event
//        emit TokensPurchased(msg.sender, address(xenon), xenonAmount, xrate);
//    }

//    // Selling Tokens Function
//    function sellXenons(uint _amount) public {
//        //User can't sell more tokens than they have
//        require(xenon.balanceOf(msg.sender) >= _amount);

//        //Calculate the Amount of Ether to redeem
//        uint etherAmount = _amount / xrate;

//        //Require that Cryptonite has enough Ether
//        require(address(this).balance >= etherAmount);

//        //Perform sales
//        xenon.transferFrom(msg.sender, address(this), _amount);
//        msg.sender.transfer(etherAmount); 

//        //Emit an event
//        emit TokensSold(msg.sender, address(xenon), _amount, xrate);
//    }

//    // --------------------------Buying Neon Token function--------------------------
//    function buyNeons() public payable {
//        // Calculate the number of token to buy
//        uint neonAmount = msg.value * nrate;

//         //Require that Cryptonite has enough tokens
//        require(neon.balanceOf(address(this)) >= neonAmount);

//         // transfers tokens to the user 
//        neon.transfer(msg.sender, neonAmount);

//        //Emit an event
//        emit TokensPurchased(msg.sender, address(neon), neonAmount, nrate);
//    }

//    // Selling Tokens Function
//    function sellNeons(uint _amount) public {
//        //User can't sell more tokens than they have
//        require(neon.balanceOf(msg.sender) >= _amount);

//        //Calculate the Amount of Ether to redeem
//        uint etherAmount = _amount / nrate;

//        //Require that Cryptonite has enough Ether
//        require(address(this).balance >= etherAmount);

//        //Perform sales
//        neon.transferFrom(msg.sender, address(this), _amount);
//        msg.sender.transfer(etherAmount); 

//        //Emit an event
//        emit TokensSold(msg.sender, address(neon), _amount, nrate);
//    }
  

}