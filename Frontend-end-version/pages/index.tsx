import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Web3Button, Web3Address } from '../components'
import abi from './ABIS.json'
import React, { useState } from "react"; 
import { TagsInput } from "react-tag-input-component"; 
import { ethers } from 'ethers';



const Home: NextPage = () => {
  const [selected, setSelected] = useState("");
  const [see , setsee] = useState("");
  const [add1 , setadd1] = useState("");
  const [add2 , setadd2] = useState("");
  const [add3 , setadd3] = useState("");
  console.log(see , setsee);

  const address = '0x24bFD8714ca7811f52d4762Cdf49CdAc7F7Dbd17';
  const provider = new ethers.providers.JsonRpcProvider('https://endpoints.omniatech.io/v1/avax/fuji/public	');
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }


  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  
  async function getMyContractData() {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log("Found an account! Address: ", accounts[0]);
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    let txn = await contract.create([see] , 1 );
    await txn.wait();
    console.log(txn)



  }
  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Web3 Next-Boilerplate</title>
        <meta name="description" content="Boilerplate for Web3 dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex flex-row justify-between p-4">
        <Link href="/about">
          <a className="text-lg font-light">About</a>
        </Link>
        <div>
          <div>
            <input
            value={see}
            onChange={e => setsee(e.target.value)}
            placeholder="Enter address plz"
             />
          </div>
        </div>
        
        {connectWalletButton()}
      </nav>
      <div>
        <button onClick={getMyContractData}>sumbit</button>
      </div>

      <main className="grow p-8 text-center">
        <h1 className="pb-8 text-4xl font-bold">Home Page</h1>
          {currentAccount}
      </main>

     
      <footer className="justify-end p-4">
        <p className="text-lg font-light">Footer</p>
      </footer>
    </div>
    


  )
}

export default Home
