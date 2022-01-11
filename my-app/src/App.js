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
  const [tasks, setTasks] = useState([]);
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
  const getTasks = async () => {
    const {contract} = web3Api;
    const tasks = await contract.getTask(1);
    console.log('tasks: ', tasks);
  }
  const handleConnectMetamask = async () => {
    if (!window.ethereum) {
      alert('Please install metamask');
      return;
    } else {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    }
  };
  const handleAddTask = async  () => {
    const {contract} = web3Api;
    await contract.createTask("task1", "hieu1", {from : account});
  }
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (newAccount) => {
        setAccount(newAccount[0]);
      });
    }
  }, []);

  useEffect(() => {
    // getTasks();
    handleConnectMetamask();
  },[])
  return (
   <>
    <div>todo list</div>
    {tasks.length === 0 && (
      <button onClick={handleAddTask}>Add task</button>
    )}
    <button onClick={getTasks}>getTasks</button>
   </>
  );
}

export default App;
