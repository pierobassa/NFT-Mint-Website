import { useState } from 'react'
import './App.css';
import MainMint from './components/MainMint/MainMint';
import NavBar from './components/NavBar/NavBar';

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const [accounts, setAccounts] = useState([]);
  
  return (
    <ChakraProvider>
      <div className='overlay'>
        <div className="App">
          <NavBar accounts={accounts} setAccounts={setAccounts} />
          <MainMint accounts={accounts} setAccounts={setAccounts} />
        </div>
        <div className='moving-background'>
          
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
