# CycleLink 🚴‍♂️🔗

CycleLink is a decentralized application (dApp) designed to streamline bike rentals using blockchain technology on the Binance Smart Chain (BSC) Testnet. Users can register, rent and return bikes, and manage payments securely. The application leverages smart contracts for transparency and security.

## Key Features

- **User Registration**: Users register by providing their first and last names.
- **Bike Checkout**: Renters can check out bikes if they meet the rental criteria.
- **Bike Return**: Renters return bikes and the system calculates rental duration and due payments.
- **Payment Processing**: Users can deposit funds and make payments directly through the dApp.
- **Owner Management**: Contract owner can withdraw earnings from the contract balance.

## Technology Stack

- ![Solidity](https://img.shields.io/badge/Solidity-363636?logo=solidity&logoColor=white) **Solidity**: For developing smart contracts.
- ![Binance Smart Chain](https://img.shields.io/badge/Binance_Smart_Chain-F3BA2F?logo=binance&logoColor=white) **Binance Smart Chain (BSC) Testnet**: Blockchain platform to deploy and run smart contracts.
- ![Hardhat](https://img.shields.io/badge/Hardhat-FF9B00?logo=hardhat&logoColor=white) **Hardhat**: Development environment for testing and deploying smart contracts.
- ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) **React**: JavaScript library for building the front-end.
- ![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?logo=chakra-ui&logoColor=white) **Chakra UI**: Component library for building accessible React applications.
- ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=react-hook-form&logoColor=white) **React Hook Form**: For handling form state and validation in React.
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white) **React Router**: For managing navigation in the React application.
- ![Ethers.js](https://img.shields.io/badge/Ethers.js-6633CC?logo=ethereum&logoColor=white) **Ethers.js**: For interacting with the Binance Smart Chain from the front-end.

## Contract Structure

```plaintext
contracts/
|-- CycleLink.sol: Main contract managing renters, bike checkouts, check-ins, and payments.

src/
|-- components/
|   |-- Home.jsx: Home page component
|   |-- Navbar.jsx: Navigation bar component
|   |-- Dashboard.jsx: Renter dashboard component
|   |-- OwnerDashboard.jsx: Admin dashboard component
|   |-- WithdrawForm.jsx: Form component for the owner to withdraw earnings
|   |-- RenterForm.jsx: Form component for users to register as renters
|   |-- PayForm.jsx: Form component for users to make payments
|   |-- AddToBalanceForm.jsx: Form component for users to add funds to their account
|   |-- Bike.jsx: Component to display bike details and actions
|-- context/
|   |-- BlockchainContext.jsx: Context provider for blockchain interactions
|-- App.jsx: Main application component with routing
```
