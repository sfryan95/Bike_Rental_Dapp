import React, { useEffect, useState } from 'react';
import { abi, contractAddress } from '../config.json';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

// Create a context for sharing blockchain-related data and functions
export const BlockchainContext = React.createContext('');

// Provider component for managing blockchain state and functions
export const BlockchainProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [balance, setBalance] = useState();
  const [renterExists, setRenterExists] = useState();
  const [renter, setRenter] = useState();
  const [renterBalance, setRenterBalance] = useState();
  const [due, setDue] = useState();
  const [duration, setDuration] = useState();
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          const web3Signer = web3Provider.getSigner();
          const web3Contract = new ethers.Contract(contractAddress, abi, web3Signer);

          setProvider(web3Provider);
          setSigner(web3Signer);
          setContract(web3Contract);

          const accounts = await web3Provider.listAccounts();
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
          } else {
            console.log('No accounts found');
          }
        } else {
          console.log('Please install MetaMask!');
        }
      } catch (error) {
        console.error('Failed to initialize provider:', error);
      }
    };

    initProvider();
  }, []);

  const connectWallet = async () => {
    try {
      if (!provider) {
        console.error('Provider is not initialized.');
        return alert('Provider not initialized. Please try again.');
      }

      const accounts = await provider.send('eth_requestAccounts', []);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const checkRenterExists = async () => {
    try {
      if (currentAccount && contract) {
        const renter = await contract.renterExists(currentAccount);
        setRenterExists(renter);
        if (renter) {
          await getRenter();
        }
      }
    } catch (error) {
      console.error('Error checking if renter exists:', error);
    }
  };

  const getRenter = async () => {
    try {
      if (currentAccount && contract) {
        const renter = await contract.getRenter(currentAccount);
        setRenter(renter);
      }
    } catch (error) {
      console.error('Error getting renter:', error);
    }
  };

  const addRenter = async (walletAddress, firstName, lastName, canRent, active, balance, due, start, end) => {
    try {
      const addRenterTx = await contract.addRenter(walletAddress, firstName, lastName, canRent, active, balance, due, start, end);
      await addRenterTx.wait();
      checkRenterExists();
    } catch (error) {
      console.error('Error adding renter:', error);
    }
  };

  const getRenterBalance = async () => {
    try {
      if (currentAccount && contract) {
        const balance = await contract.balanceOfRenter(currentAccount);
        setRenterBalance(ethers.utils.formatEther(balance));
      }
    } catch (error) {
      console.error('Error getting renter balance:', error);
    }
  };

  const getBalance = async () => {
    try {
      if (provider && currentAccount) {
        const balance = await provider.getBalance(currentAccount);
        setBalance(ethers.utils.formatEther(balance));
      }
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  const deposit = async (value) => {
    try {
      const bnbValue = ethers.utils.parseEther(value);
      const depositTx = await contract.deposit(currentAccount, { value: bnbValue });
      await depositTx.wait();
      await getRenterBalance();
    } catch (error) {
      console.error('Error making deposit:', error);
    }
  };

  const getDue = async () => {
    try {
      if (currentAccount && contract) {
        const due = await contract.getDue(currentAccount);
        setDue(ethers.utils.formatEther(due));
      }
    } catch (error) {
      console.error('Error getting due amount:', error);
    }
  };

  const getTotalDuration = async () => {
    try {
      if (currentAccount && contract) {
        const totalDuration = await contract.getTotalDuration(currentAccount);
        setDuration(Number(totalDuration));
      }
    } catch (error) {
      console.error('Error getting total duration:', error);
    }
  };

  const makePayment = async (value) => {
    try {
      const bnbValue = ethers.utils.parseEther(value);
      const paymentTx = await contract.makePayment(currentAccount, bnbValue);
      await paymentTx.wait();
      await getRenter();
      await getRenterBalance();
      await getTotalDuration();
      await getDue();
    } catch (error) {
      console.error('Error making payment:', error);
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const checkOut = async () => {
    try {
      const checkOutTx = await contract.checkOut(currentAccount);
      await checkOutTx.wait();
      await getRenter();
    } catch (error) {
      console.error('Error checking out:', error);
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const checkIn = async () => {
    try {
      const checkInTx = await contract.checkIn(currentAccount);
      await checkInTx.wait();
      await getRenter();
      await getDue();
      await getTotalDuration();
    } catch (error) {
      console.error('Error checking in:', error);
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (provider && contract) {
      checkRenterExists();
      getRenterBalance();
      getDue();
      getTotalDuration();
      getBalance();
    }
  }, [currentAccount, provider, contract]);

  return (
    <BlockchainContext.Provider
      value={{
        connectWallet,
        currentAccount,
        balance,
        renterExists,
        addRenter,
        renterBalance,
        deposit,
        due,
        duration,
        renter,
        makePayment,
        checkOut,
        checkIn,
      }}>
      {children}
    </BlockchainContext.Provider>
  );
};
