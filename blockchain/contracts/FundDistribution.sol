// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FundDistribution {
    address public owner;
    uint public distributionCount;

    struct Distribution {
        uint id;
        address beneficiary;
        uint amount;
        string scheme;
        bool verified;
        uint timestamp;
    }

    mapping(uint => Distribution) public distributions;

    event FundDistributed(uint indexed id, address indexed beneficiary, uint amount, string scheme, uint timestamp);
    event FundVerified(uint indexed id, address indexed verifier, uint timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        distributionCount = 0;
    }

    function distributeFund(address beneficiary, uint amount, string memory scheme) public onlyOwner {
        require(beneficiary != address(0), "Invalid beneficiary address");
        require(amount > 0, "Amount must be greater than 0");
        require(bytes(scheme).length > 0, "Scheme name cannot be empty");
        require(bytes(scheme).length <= 128, "Scheme name too long");
        
        distributionCount++;
        distributions[distributionCount] = Distribution({
            id: distributionCount,
            beneficiary: beneficiary,
            amount: amount,
            scheme: scheme,
            verified: false,
            timestamp: block.timestamp
        });

        emit FundDistributed(distributionCount, beneficiary, amount, scheme, block.timestamp);
    }

    function getDistribution(uint id) public view returns (Distribution memory) {
        require(id > 0 && id <= distributionCount, "Invalid distribution ID");
        return distributions[id];
    }

    function getAllDistributions() public view returns (Distribution[] memory) {
        Distribution[] memory allDistributions = new Distribution[](distributionCount);
        for (uint i = 1; i <= distributionCount; i++) {
            allDistributions[i - 1] = distributions[i];
        }
        return allDistributions;
    }

    function verifyDistribution(uint id) public onlyOwner {
        require(id > 0 && id <= distributionCount, "Invalid distribution ID");
        require(!distributions[id].verified, "Already verified");
        
        distributions[id].verified = true;
        emit FundVerified(id, msg.sender, block.timestamp);
    }
}
