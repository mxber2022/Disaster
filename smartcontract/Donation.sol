// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {
    address public owner;
    uint256 public totalDonations;

    event DonationReceived(address indexed donor, uint256 amount);
    event Withdraw(address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender; // Set the owner to the contract creator
    }

    // Function to receive donations
    receive() external payable {
        require(msg.value > 0, "You must send some Ether");
        totalDonations += msg.value; // Update total donations
        emit DonationReceived(msg.sender, msg.value); // Emit donation event
    }

    // Function to withdraw donations to a specific address
    function withdraw(address payable _to) external {
        require(msg.sender == owner, "Only the owner can withdraw");
        uint256 amount = address(this).balance; // Get the balance of the contract
        require(amount > 0, "No funds to withdraw");
        require(_to != address(0), "Cannot withdraw to the zero address");
        _to.transfer(amount); // Transfer the funds to the specified address
        emit Withdraw(_to, amount); // Emit withdraw event
    }

    // Function to check the contract balance
    function getBalance() external view returns (uint256) {
        return address(this).balance; // Return the contract balance
    }
}
