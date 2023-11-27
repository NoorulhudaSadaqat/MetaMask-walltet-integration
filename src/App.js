import Web3 from "web3";
import { useState, useEffect } from "react";

import { BSC_CHAIN_ID, MUMBAI_CHAIN_ID, ARBITRUM_CHAIN_ID, AVALANCHE_CHAIN_ID, SEPOLIA_CHAIN_ID, FANTOM_CHAIN_ID } from "./constants";

function App() {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });

      window.ethereum.on("chainChanged", (chainId) => {
        setChainId(chainId);
      });
    }
  }, []);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        const networkId = await web3.eth.net.getId();
        setAccount(accounts[0]);
        setChainId(networkId);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const addChainHandler = async (chainData) => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [chainData],
      });
    } catch (addError) {
      console.error(addError);
    }
  };

  const switchChainHandler = async (chainId) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (switchError) {
      console.error(switchError);
    }
  };

  return (
    <div>
      <button onClick={connectWalletHandler}>Connect Wallet</button>
      {account && <p>Connected Account: {account}</p>}
      {chainId && <p>Connected Chain ID: {chainId}</p>}
      {account && (
        <button onClick={() => switchChainHandler(SEPOLIA_CHAIN_ID)}>
          Switch to Sepolia
        </button>
      )}
      {account && (
        <button onClick={() => switchChainHandler(AVALANCHE_CHAIN_ID)}>
          Switch to Avalanche
        </button>
      )}
      {account && (
        <button onClick={() => switchChainHandler(BSC_CHAIN_ID)}>
          Switch to Binance Smart Chain (BSC)
        </button>
      )}
      {account && (
        <button onClick={() => switchChainHandler(MUMBAI_CHAIN_ID)}>
          Mumbai (Polygon Testnet)
        </button>
      )}
      {account && (
        <button onClick={() => switchChainHandler(FANTOM_CHAIN_ID)}>
          Switch to Fantom
        </button>
      )}
      {account && (
        <button onClick={() => switchChainHandler(ARBITRUM_CHAIN_ID)}>
          Switch to Arbitrum
        </button>
      )}
      {/* <button> Add Chain Handler</button> */}
    </div>
  );
}

export default App;
