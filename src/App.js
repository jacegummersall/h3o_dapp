import './App.css';
import MintExampleABI from './MintExampleAbi.json';
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from 'react';


const mintExampleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  //Connection
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const [accounts, setAccounts] = useState([]);

  async function connectAccounts(){
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts" 
      });
      setAccounts(accounts);
    }
  }

  function connectMetaMask(){
    if (window.ethereum){
      const accounts = window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccounts(accounts);
    }else{
      return "Test";
    }
  }

  // useEffect(() => {
  //   connectAccounts();
  // }, []);

  //MINTING
  const [mintAmount, setMintAmount] = useState(1);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintExampleAddress,
        MintExampleABI.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount))
        console.log("response: ", response);
      } catch(err) {
        console.log("error: ", err);
      }
    } 
  }

  return (

// <div className="App">
//       <header className="App-header">
//         {haveMetamask ? (
//           <div className="App-header">
//             {isConnected ? (
//               <div className="card">
//                 <div className="card-row">
//                   <h3>Wallet Address:</h3>
//                   <p>
//                     {accountAddress.slice(0, 4)}...
//                     {accountAddress.slice(38, 42)}
//                   </p>
//                 </div>
//                 <div className="card-row">
//                   <h3>Wallet Balance:</h3>
//                   <p>{accountBalance}</p>
//                 </div>
//               </div>
//             ) : (
//               <img className="App-logo" alt="logo" />
//             )}
//             {isConnected ? (
//               <p className="info">🎉 Connected Successfully</p>
//             ) : (
//               <button className="btn" onClick={connectWallet}>
//                 Connect
//               </button>
//             )}
//           </div>
//         ) : (
//           <p>Please Install MataMask</p>
//         )}
//       </header>
//     </div>
//   );

    <div className="App">
      <div class="mint">
        <div class="nav">
          <ul class="menu">
            <li class="item"><a href="#about">About</a></li>
            <li class="item"><a href="#roadmap">Roadmap</a></li>
            <li class="item"><a href="#drip">Drip</a></li>
            <li class="item"><a href="#team">Team</a></li>
            <li class="item"><a href="#faq">FAQ</a></li>
            <li class="toggle"><a href="#"><i class="fas fa-bars"></i></a></li>
          </ul>
        </div>
        <div>
        <svg width="75px" height="75px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M147.7 47.51c-18.5 1.07-20 4.26-25.8 21.09l-61.08 184c-4.93 31.5-43.19 39.2-35.94 75.4 4.32 17.6 38.84 14 44.66 31.1 8.92 26.4-44.79 59.6-25.46 79.7 21.62 22.4 59.92-33.3 90.02-25.2 21.6 5.8 22.5 69.5 44.3 74.4 40.8 9.2 79.6-60.3 119.5-74.3 57.8-19.3 104.6 59.7 134.8 40.7 18.4-13.3-1-39.2-4.4-67.9 1.9-36.6 72.6-21.7 57.7-53.6-9.4-11.6-23.5-18.7-40.4-22.7l39-117.6c4.6-13.6 1.3-20.9-8-27.9L335.9 54.6c-9.1-7.26-16.5-11.45-24.2-13.65-51.4-5.4-110.3 3.4-164 6.56zM271 56.74c14.5 0 25.4 1.17 35.4 4.14 18.9 5.63 34.3 17.44 63.9 40.52 67 52 91.9 73.9 37 78.3-65.6 5.5-112.4 5.5-142.9-20.2l-76.6-64.67c-23.9-20.23-29-32.42 26-35.67 24.4-1.41 42.6-2.46 57.2-2.42zM140.9 83.23c15.7 2.9 41.7 27.67 48.7 33.67 97 83 96 85.3 56.6 190.1-2.9 7.6-5.5 14.5-7.9 20.7-6.4.5-12.8.5-19.2.1 5.6-9.4 9.4-20 11.2-25.4 16.5-49.9 11-92 .2-113-4.8-9.2-10.2-13.6-13.8-14.7-18.4 8.3-17.1 31.8-37 38.4-26.5 6.1-51-13.4-70.7 8.9-17.04 22-13.41 39.3 1.2 58.4 6.2 8.1 14.3 16 23 23.7-16.3-7-31.7-14.3-45.82-20.5-11.37-15.4-11.24-28.4-3.79-50.5L126.4 105c4.5-13.77 7.6-21.67 14.5-21.77zm172.4 19.97c-19.6-.3-31.7 9.7-36 20.5-3.1 7.8-2.3 16.2 3.7 23.8 5.9 7.4 17.7 14.3 37.4 16.2 30.1 2.9 52.4 2.6 66.9.1 24.2-4.2 24.9-10.5 8.6-24.5-9.9-8.3-26.5-18.1-48.4-28.1-10.4-4.4-21.5-7.7-32.2-8zm104 92.9c9.5.1 17 .7 22.7 2.3 23.4 6.6 16.5 29.2-3.6 89.8-2.3 6.8-4.4 13.2-6.4 19.2-5.9-.7-12-1.2-18.3-1.4 5.5-13.5 10.3-29 14.1-46.5 4.6-17.6-7.7-44.3-25.6-30.6-4.5 3.7-8.9 10.1-11.1 20.9-3 13.9-12.5 29.2-25.5 41.7-32.3 22.2-72.6 27.5-107.1 33.8l31-83.4c13.9-37.4 18.2-39.2 95.1-44.3 13.8-.9 25.2-1.5 34.7-1.5zm-105.7 33.6c-5.9 8-5.7 21.7-.8 34.2 5.7 14.3 12.6 17.3 21.2 16.8 8.6-.3 19.7-6.2 28.1-14.7 8.4-8.6 14-19.5 14.3-27.2.1-9.9-8-13.6-15.4-15.8-15-3.4-37.3-6.3-47.4 6.7zm-1.4 202.4c-2.9 0-5.6.6-7.9 2.1-9.2 5.9-1.9 25.4 6.7 32.2 9.1 7.2 31.4 10 34.9-1.1 4.4-13.9-17.9-33.1-33.7-33.2z"/></svg>
          {!accounts.length && (
            <div>
              <button onClick={() => connectMetaMask()}>Connect Wallet</button>
            </div>
          )}
          {accounts.length && (
            <div>
              <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>
              {mintAmount}
              <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
              <button onClick={() => handleMint}>Mint</button>
            </div>
          )}
        </div>
      </div>
      <div id="about" class="about">
        <h1>About</h1>
      </div>
      <div id="roadmap" class="roadmap">
        <h1>Roadmap</h1>
      </div>
      <div id="team" class="team">
        <h1>Team</h1>
      </div>
      <div id="faq" class="faq">
        <h1>FAQ</h1>
      </div>
    </div>
   );
 }

export default App;
