import { ethers } from 'ethers';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

const CONTRACT_ABI = [
  "function distributeFund(address beneficiary, uint amount, string scheme) public",
  "function getDistribution(uint id) public view returns (tuple(uint id, address beneficiary, uint amount, string scheme, bool verified, uint timestamp))",
  "function getAllDistributions() public view returns (tuple(uint id, address beneficiary, uint amount, string scheme, bool verified, uint timestamp)[])",
  "function verifyDistribution(uint id) public",
  "function distributionCount() public view returns (uint)",
  "event FundDistributed(uint indexed id, address indexed beneficiary, uint amount, string scheme, uint timestamp)",
  "event FundVerified(uint indexed id, address indexed verifier, uint timestamp)"
];

export const connectWallet = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is not installed');
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  return { provider, signer, address: await signer.getAddress() };
};

export const getContract = async (signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export const getAllDistributions = async () => {
  if (typeof window === 'undefined' || !window.ethereum) return [];
  try {
    const { signer } = await connectWallet();
    const contract = await getContract(signer);
    return await contract.getAllDistributions();
  } catch {
    return [];
  }
};

export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
