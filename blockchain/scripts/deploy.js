const hre = require("hardhat");

async function main() {
  console.log("Deploying FundDistribution contract...");
  
  const FundDistribution = await hre.ethers.getContractFactory("FundDistribution");
  const fundDistribution = await FundDistribution.deploy();
  
  await fundDistribution.waitForDeployment();
  
  const address = await fundDistribution.getAddress();
  console.log(`FundDistribution deployed to: ${address}`);
  
  return address;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
