import web3 from "web3";

// const provider = new web3.providers.HttpProvider("https://mainnet-slice-rpc.com/")

// const provider = new web3( new web3.providers.WebsocketProvider('wss://mainnet-slice-rpc.com/ws'));
 const provider = new web3( new web3.providers.WebsocketProvider('wss://test-slice-rpc.com/ws'));

export const Web3 = new web3(provider);