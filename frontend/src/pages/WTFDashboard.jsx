import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";

const WTF_ADDRESS = "0x4a98a44888abf5165e20037f532f5a2227919740"; // replace with your verified address on mainnet when ready
const WTF_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)"
];

export default function WTFDashboard() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [tokenInfo, setTokenInfo] = useState({});

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
    }
  }, []);

  const connectWallet = async () => {
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    setSigner(signer);
    setAddress(userAddress);

    const contract = new ethers.Contract(WTF_ADDRESS, WTF_ABI, provider);
    const balance = await contract.balanceOf(userAddress);
    const decimals = await contract.decimals();
    const symbol = await contract.symbol();
    const name = await contract.name();
    const supply = await contract.totalSupply();

    setBalance(ethers.formatUnits(balance, decimals));
    setTokenInfo({ name, symbol, decimals, supply: ethers.formatUnits(supply, decimals) });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">World Trade Factory (WTF)</h1>
      <p className="mb-2">A decentralized token for the future of world trade.</p>
      <Button className="mt-4 mb-6" onClick={connectWallet}>Connect Wallet</Button>

      {address && (
        <div className="bg-gray-800 p-4 rounded-xl shadow-xl w-full max-w-md">
          <p className="mb-2">Connected Wallet: {address}</p>
          <p className="mb-2">Token Balance: {balance} {tokenInfo.symbol}</p>
          <p className="mb-2">Token Name: {tokenInfo.name}</p>
          <p className="mb-2">Total Supply: {tokenInfo.supply} {tokenInfo.symbol}</p>
        </div>
      )}
    </div>
  );
}
