import Web3 from 'web3';
import React, {useEffect, useState} from 'react'
import detectEthereumProvider from '@metamask/detect-provider';
import {loadContract} from './loadContract';

function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [web3Api, setWeb3Api] = useState({
    web3: null,
    provider: null,
    contract: null,
  });
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract('TodoList', provider);
      setWeb3Api({
        provider: provider,
        web3: new Web3(provider),
        contract: contract,
      });
    };
    loadProvider();
  }, []);
  const handleConnectMetamask = async () => {
    if (!window.ethereum) {
      alert('Please install metamask');
      return;
    } else {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
    }
  };
  useEffect(() => {
    handleConnectMetamask();
  },[])
  return (
   <>
    <div>todo list</div>
   </>
  );
}

export default App;
