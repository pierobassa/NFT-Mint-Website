import React from "react";
import { useState } from "react";
import { ethers, BigNumber } from 'ethers'; //ethers allows to connect to the blockchain very easily. It's an alternative of web3js but is now the industry standard
import roboPunksNFT from '../../RoboPunksNFT.json';

import { Box, Button, Flex, Input, Text, Spacer } from '@chakra-ui/react';

const roboPunksNFTAddress = "0x84e9D8671Cbb7faECe8718f1c9f87B038aB4AE68";
const maxMintAmount = 3;

const MainMint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1); //initializing mintAmount to 1
    const isConnected = Boolean(accounts[0]); //If accounts[0] is not empty then isConnected=true

    async function handleMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum); //provides a way for ethers to connect to the blockchain. It's an initial setup
            const signer = provider.getSigner(); //every transaction needs a signer (account connected)

            const contract = new ethers.Contract(roboPunksNFTAddress, roboPunksNFT.abi, signer); //We pass the address of the contract, the abi which is the interface to interact with the contract, and the signer

            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {value: ethers.utils.parseEther((0.02 * mintAmount).toString())}); //mint is the function of the smart contract. Solidity requires a BigNumber instead of an int
                console.log('response: ', response); 
            }
            catch(err){
                console.log('error: ', err);
            }
        }
    }

    const handleDecrement = () => {
        if(mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }
    const handleIncrement = () => {
        if(mintAmount >= maxMintAmount) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks</Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >
                            It's 2078. Can the RoboPunks save humans from the descructive rampant nuclear apocalypse? Mint RoboPunks to find out.
                    </Text>
                </div>
                <Box padding="10px"/>  
                {isConnected ?
                (
                    <div>
                        <Flex align="center" justify="center">
                            <Button 
                                colorScheme="cyan"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="0 15px"
                                onClick={handleDecrement}
                            >
                                -
                            </Button>
                            <Input 
                                readOnly
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                type="number" 
                                value={mintAmount} 
                            />
                            <Button 
                                colorScheme="cyan"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="0 15px"
                                onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </Flex>
                        <Box padding="5px"/>  
                        <Button 
                                colorScheme="cyan"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="0 15px"
                                onClick={handleMint}
                        >
                            Mint now
                        </Button>
                    </div>
                ) :
                (
                    <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 3px #000000"
                        color="cyan"
                    >
                        Connect wallet to Mint
                    </Text> 
                )}
              
            </Box>
        </Flex>
    )
}

export default MainMint;