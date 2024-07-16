// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

/// @title CycleLink
/// @notice This contract manages a bike rental system, allowing users to rent and return bikes, track rental durations, and handle payments.
/// @dev Implements basic functionalities for bike rental management including adding renters, checking out and in bikes, and payment processing.
contract CycleLink {

    // Address of the contract owner
    address owner;
    uint ownerBalance;

    constructor() {
        owner = msg.sender;
    }

    // Add yourself as a Renter
    struct Renter {
        address payable walletAddress;
        string firstName;
        string lastName;
        bool canRent;
        bool active;
        uint balance;
        uint due;
        uint start;
        uint end;
    }

    mapping (address => Renter) public renters;

    function addRenter(address payable walletAddress, string memory firstName, string memory lastName, bool canRent, bool active, uint balance, uint due, uint start, uint end) public {
        renters[walletAddress] = Renter(walletAddress, firstName, lastName, canRent, active, balance, due, start, end);
    }

    modifier isRenter(address walletAddress) {
        require(msg.sender == walletAddress, "You can only manage your account.");
        _;
    }

    function isOwner() view public returns(bool) {
        return owner == msg.sender;
    }


    modifier onlyOwner() {
        require(msg.sender == owner, "You are not allowed to access this.");
        _;
    }

    // Checkout bike
    function checkOut(address walletAddress) public isRenter(walletAddress) {
        require(renters[walletAddress].due == 0, "You have a pending balance.");
        require(renters[walletAddress].canRent == true, "You cannot rent at this time.");
        renters[walletAddress].active = true;
        renters[walletAddress].start = block.timestamp;
        renters[walletAddress].canRent = false;
    }

    // Check in a bike
    function checkIn(address walletAddress) public isRenter(walletAddress) {
        require(renters[walletAddress].active == true, "Please check out a bike first.");
        renters[walletAddress].active = false;
        renters[walletAddress].end = block.timestamp;
        setDue(walletAddress);
    }

    // Get total duration of bike use
    function renterTimespan(uint start, uint end) internal pure returns(uint) {
        return end - start;
    }

    function getTotalDuration(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        if (renters[walletAddress].start == 0 || renters[walletAddress].end == 0) {
            return 0;
        } else {
            uint timespan = renterTimespan(renters[walletAddress].start, renters[walletAddress].end);
            return timespan;
        }
    }

    // Get Contract balance
    function balanceOf() view public onlyOwner() returns(uint) {
        return address(this).balance;
    }

    function getOwnerBalance() view public onlyOwner() returns(uint) {
        return ownerBalance;
    }

    function withdrawOwnerBalance() payable public {
        payable(owner).transfer(ownerBalance);
        ownerBalance = 0;
    }

    // Get Renter's balance
    function balanceOfRenter(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        return renters[walletAddress].balance;
    }

    // Set Due amount
    function setDue(address walletAddress) internal {
        uint timespanSeconds = getTotalDuration(walletAddress);
        renters[walletAddress].due = timespanSeconds * 10000000000000; // 0.00001 ether per second
    }

    function canRentBike(address walletAddress) public isRenter(walletAddress) view returns(bool) {
        return renters[walletAddress].canRent;
    }

    // Deposit
    function deposit(address walletAddress) isRenter(walletAddress) payable public {
        renters[walletAddress].balance += msg.value;
    }

    // Make Payment
    function makePayment(address walletAddress, uint amount) public isRenter(walletAddress) {
        require(renters[walletAddress].due > 0, "You do not have anything due at this time.");
        require(renters[walletAddress].balance > amount, "You do not have enough funds to cover payment. Please make a deposit.");
        renters[walletAddress].balance -= amount;
        ownerBalance += amount;
        renters[walletAddress].canRent = true;
        renters[walletAddress].due = 0;
        renters[walletAddress].start = 0;
        renters[walletAddress].end = 0;
    }

    function getDue(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        return renters[walletAddress].due;
    }

    function getRenter(address walletAddress) public isRenter(walletAddress) view returns(string memory firstName, string memory lastName, bool canRent, bool active) {
        firstName = renters[walletAddress].firstName;
        lastName = renters[walletAddress].lastName;
        canRent = renters[walletAddress].canRent;
        active = renters[walletAddress].active;
    }

    function renterExists(address walletAddress) public isRenter(walletAddress) view returns(bool) {
        if (renters[walletAddress].walletAddress != address(0)) {
            return true;
        }
        return false;
    }

}
