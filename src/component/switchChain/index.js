import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./switch.module.css";
import {
  BSC_CHAIN_ID,
  MUMBAI_CHAIN_ID,
  ARBITRUM_CHAIN_ID,
  AVALANCHE_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
  FANTOM_CHAIN_ID,
} from "../../constants";
import { setAccount, setChainId } from "../../store/actions";

const SwitchChain = () => {
  const dispatch = useDispatch();
  const { account, chainId } = useSelector((state) => state.wallet);
  console.log("account", account, "chainId", chainId)


  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        dispatch(setAccount(accounts[0]));
      });

      window.ethereum.on("chainChanged", (chainId) => {
        dispatch(setChainId(`${chainId}`));
      });
    }
  }, []);

  const addChainHandler = async (chainData) => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
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

  const chains = [
    { id: SEPOLIA_CHAIN_ID, label: "Sepolia" },
    { id: AVALANCHE_CHAIN_ID, label: "Avalanche" },
    { id: BSC_CHAIN_ID, label: "Binance Smart Chain (BSC)" },
    { id: MUMBAI_CHAIN_ID, label: "Mumbai (Polygon Testnet)" },
    { id: FANTOM_CHAIN_ID, label: "Fantom" },
    { id: ARBITRUM_CHAIN_ID, label: "Arbitrum" },
  ];

  return (
    <div className={styles.container}>
      {account && <p>Connected Account: {account}</p>}
      {chainId && <p>Connected Chain ID: {chainId}</p>}
      {account && 
        chains.map((chain) => (
          chainId!==chain.id && <button
            key={chain.id}
            onClick={() => switchChainHandler(chain.id)}
            className={styles.button}
          >
            Switch to {chain.label}
          </button>
        ))}
    </div>
  );
};

export default SwitchChain;
