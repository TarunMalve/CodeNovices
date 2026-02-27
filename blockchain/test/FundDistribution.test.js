const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FundDistribution", function () {
  let fundDistribution;
  let owner;
  let beneficiary;

  beforeEach(async function () {
    [owner, beneficiary] = await ethers.getSigners();
    const FundDistribution = await ethers.getContractFactory("FundDistribution");
    fundDistribution = await FundDistribution.deploy();
  });

  it("Should set the right owner", async function () {
    expect(await fundDistribution.owner()).to.equal(owner.address);
  });

  it("Should distribute fund correctly", async function () {
    await fundDistribution.distributeFund(beneficiary.address, 6000, "PM Kisan");
    expect(await fundDistribution.distributionCount()).to.equal(1);
    
    const distribution = await fundDistribution.getDistribution(1);
    expect(distribution.beneficiary).to.equal(beneficiary.address);
    expect(distribution.amount).to.equal(6000);
    expect(distribution.scheme).to.equal("PM Kisan");
    expect(distribution.verified).to.equal(false);
  });

  it("Should emit FundDistributed event", async function () {
    await expect(fundDistribution.distributeFund(beneficiary.address, 6000, "PM Kisan"))
      .to.emit(fundDistribution, "FundDistributed")
      .withArgs(1, beneficiary.address, 6000, "PM Kisan", expect.anything());
  });

  it("Should verify distribution correctly", async function () {
    await fundDistribution.distributeFund(beneficiary.address, 6000, "PM Kisan");
    await fundDistribution.verifyDistribution(1);
    
    const distribution = await fundDistribution.getDistribution(1);
    expect(distribution.verified).to.equal(true);
  });

  it("Should emit FundVerified event", async function () {
    await fundDistribution.distributeFund(beneficiary.address, 6000, "PM Kisan");
    await expect(fundDistribution.verifyDistribution(1))
      .to.emit(fundDistribution, "FundVerified")
      .withArgs(1, owner.address, expect.anything());
  });

  it("Should get all distributions", async function () {
    await fundDistribution.distributeFund(beneficiary.address, 6000, "PM Kisan");
    await fundDistribution.distributeFund(beneficiary.address, 2500, "LPG Subsidy");
    
    const allDist = await fundDistribution.getAllDistributions();
    expect(allDist.length).to.equal(2);
  });

  it("Should reject non-owner distribution", async function () {
    await expect(
      fundDistribution.connect(beneficiary).distributeFund(beneficiary.address, 6000, "PM Kisan")
    ).to.be.revertedWith("Only owner can call this function");
  });

  it("Should reject invalid beneficiary address", async function () {
    await expect(
      fundDistribution.distributeFund(ethers.ZeroAddress, 6000, "PM Kisan")
    ).to.be.revertedWith("Invalid beneficiary address");
  });

  it("Should reject zero amount", async function () {
    await expect(
      fundDistribution.distributeFund(beneficiary.address, 0, "PM Kisan")
    ).to.be.revertedWith("Amount must be greater than 0");
  });
});
