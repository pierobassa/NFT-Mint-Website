import React from "react";
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Twitter from '../../assets/social-media-icons/icons8-twitter-48.png';
import Discord from '../../assets/social-media-icons/icons8-discord-50.png';
import Instagram from '../../assets/social-media-icons/icons8-instagram-48.png';

const NavBar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]); 

    async function connectAccount() {
        if(window.ethereum){ //Metamask injects the application with window.ethereum
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="30px">
            {/* Left side - Social Media Icons */}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://www.twitter.com">
                    <Image src={Twitter} boxSize="50px" margin="0 15px" />
                </Link>
                <Link href="https://www.discord.com">
                    <Image src={Discord} boxSize="50x" margin="0 15px" />
                </Link>
                <Link href="https://www.instagram.com">
                    <Image src={Instagram} boxSize="50px" margin="0 15px" />
                </Link>
            </Flex> 

            {/* Right side - Sections and Connect wallet */}
            <Flex justify="space-around" align="center" width="40%" padding="30px">
                <Box margin="0 15px">About</Box> 
                <Spacer />
                <Box margin="0 15px">Mint</Box>
                <Spacer />
                <Box margin="0 15px">Team</Box>
                <Spacer />  
            </Flex>
            { isConnected ? 
                (<Box margin="0 15px">Connected</Box>)  
                : 
                (<Button 
                    onClick={connectAccount}
                    colorScheme="cyan"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    color="white"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    margin="0 15px"
                
                >
                    Connect
                </Button>)
            }
        </Flex>
    )
}

export default NavBar;