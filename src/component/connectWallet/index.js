import React from "react";
import Web3 from "web3";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { setAccount, setChainId } from "../../store/actions";
import styles from "./connect.module.css";
import { useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';
// import contractABI from 'https://api-testnet.bscscan.com/api?module=contract&action=getabi&address=0x9dB30DD62FBC87A40D35Dc52E0e10D148e128aAc';

import contractAbi from "../../contractabi.json";

const contractAddress = "0x9dB30DD62FBC87A40D35Dc52E0e10D148e128aAc";
const nftMetadata = {
  name: "My Test NFT",
  description: "This is a test NFT",
  image: "https://unsplash.com/photos/a-steering-wheel-and-dashboard-of-a-car-FPzfl_8cRho", 
};

const uri = `data:application/json;base64,${Buffer.from(
  JSON.stringify(nftMetadata)
).toString("base64")}`;

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        const networkId = await web3.eth.net.getId();
        dispatch(setAccount(accounts[0]));
        dispatch(setChainId(`${networkId}`));
        console.log(networkId);
        navigate("/chains");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const safeMint = async () => {
    if (!window.ethereum) {
      return alert("Please install MetaMask.");
    }

    try {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const toAddress = await signer.getAddress(); 
      const tokenId = 1; 
      const tx = await contract.mintNft(toAddress, tokenId, uri);

      console.log("Transaction Hash:", tx.hash);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={connectWalletHandler}>
        Connect Wallet
      </button><br/>
      <button className={styles.button} onClick={safeMint}>
        Safe Mint
      </button>
    </div>
  );
};

export default ConnectWallet;
