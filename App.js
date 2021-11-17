import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react";
import Web3 from 'web3';


function App() {
  // const [expdur,setexpdur]=useState(null);
  const Crypto = require('crypto')
  const [keyprice,setkeyprice]=useState(null);
  const [noofkey,setnoofkey]=useState(null);
  const [lockname,setlockname]=useState(null);
  const [createdaddress,setcreatedaddress]=useState(null);
 
  const contractAddress = '0xD8C88BE5e8EB88E38E6ff5cE186d764676012B0b';
  const abi =[
    {"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"udt","type":"address"},{"indexed":false,"internalType":"address","name":"weth","type":"address"},{"indexed":false,"internalType":"uint256","name":"estimatedGasForPurchase","type":"uint256"},{"indexed":false,"internalType":"string","name":"globalTokenSymbol","type":"string"},{"indexed":false,"internalType":"string","name":"globalTokenURI","type":"string"},{"indexed":false,"internalType":"uint256","name":"chainId","type":"uint256"}],"name":"ConfigUnlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"lockOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newLockAddress","type":"address"}],"name":"NewLock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"grossNetworkProduct","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalDiscountGranted","type":"uint256"}],"name":"ResetTrackedValue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"publicLockAddress","type":"address"}],"name":"SetLockTemplate","type":"event"},{"constant":true,"inputs":[],"name":"chainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"computeAvailableDiscountFor","outputs":[{"internalType":"uint256","name":"discount","type":"uint256"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_udt","type":"address"},{"internalType":"address","name":"_weth","type":"address"},{"internalType":"uint256","name":"_estimatedGasForPurchase","type":"uint256"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string","name":"_URI","type":"string"},{"internalType":"uint256","name":"_chainId","type":"uint256"}],"name":"configUnlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_expirationDuration","type":"uint256"},{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_keyPrice","type":"uint256"},{"internalType":"uint256","name":"_maxNumberOfKeys","type":"uint256"},{"internalType":"string","name":"_lockName","type":"string"},{"internalType":"bytes12","name":"_salt","type":"bytes12"}],"name":"createLock","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"estimatedGasForPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getGlobalBaseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getGlobalTokenSymbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"globalBaseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"globalTokenSymbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"grossNetworkProduct","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_unlockOwner","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"locks","outputs":[{"internalType":"bool","name":"deployed","type":"bool"},{"internalType":"uint256","name":"totalSales","type":"uint256"},{"internalType":"uint256","name":"yieldedDiscountTokens","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"publicLockAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_discount","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"recordConsumedDiscount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"recordKeyPurchase","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_grossNetworkProduct","type":"uint256"},{"internalType":"uint256","name":"_totalDiscountGranted","type":"uint256"}],"name":"resetTrackedValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_publicLockAddress","type":"address"}],"name":"setLockTemplate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_oracleAddress","type":"address"}],"name":"setOracle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalDiscountGranted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"udt","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"uniswapOracles","outputs":[{"internalType":"contract IUniswapOracle","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unlockVersion","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"weth","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}
  ];
  
  const pabi = [
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"sendTo","type":"address"},{"indexed":false,"internalType":"uint256","name":"refund","type":"uint256"}],"name":"CancelKey","type":"event"},{"anonymous":false,"inputs":[],"name":"Disable","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"_timeAdded","type":"bool"}],"name":"ExpirationChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ExpireKey","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"KeyGranterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"KeyGranterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"_newManager","type":"address"}],"name":"KeyManagerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"LockManagerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"LockManagerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"symbol","type":"string"}],"name":"NewLockSymbol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"keyManager","type":"address"},{"indexed":false,"internalType":"uint256","name":"nextAvailableNonce","type":"uint256"}],"name":"NonceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldKeyPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"keyPrice","type":"uint256"},{"indexed":false,"internalType":"address","name":"oldTokenAddress","type":"address"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"PricingChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"freeTrialLength","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"refundPenaltyBasisPoints","type":"uint256"}],"name":"RefundPenaltyChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"newExpiration","type":"uint256"}],"name":"RenewKeyPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"transferFeeBasisPoints","type":"uint256"}],"name":"TransferFeeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addKeyGranter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addLockManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approveBeneficiary","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_keyOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"cancelAndRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_keyManager","type":"address"},{"internalType":"uint8","name":"_v","type":"uint8"},{"internalType":"bytes32","name":"_r","type":"bytes32"},{"internalType":"bytes32","name":"_s","type":"bytes32"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"cancelAndRefundFor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"disableLock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"expirationDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_keyOwner","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"expireAndRefundFor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"freeTrialLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_account","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_keyManager","type":"address"},{"internalType":"address","name":"_txSender","type":"address"}],"name":"getCancelAndRefundApprovalHash","outputs":[{"internalType":"bytes32","name":"approvalHash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_keyOwner","type":"address"}],"name":"getCancelAndRefundValueFor","outputs":[{"internalType":"uint256","name":"refund","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_keyOwner","type":"address"}],"name":"getHasValidKey","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_page","type":"uint256"},{"internalType":"uint256","name":"_pageSize","type":"uint256"}],"name":"getOwnersByPage","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"getTokenIdFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_keyOwner","type":"address"},{"internalType":"uint256","name":"_time","type":"uint256"}],"name":"getTransferFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_recipients","type":"address[]"},{"internalType":"uint256[]","name":"_expirationTimestamps","type":"uint256[]"},{"internalType":"address[]","name":"_keyManagers","type":"address[]"}],"name":"grantKeys","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_lockCreator","type":"address"},{"internalType":"uint256","name":"_expirationDuration","type":"uint256"},{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_keyPrice","type":"uint256"},{"internalType":"uint256","name":"_maxNumberOfKeys","type":"uint256"},{"internalType":"string","name":"_lockName","type":"string"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_nextAvailableNonce","type":"uint256"}],"name":"invalidateOffchainApproval","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isAlive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isKeyGranter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_keyOwner","type":"address"}],"name":"isKeyOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isLockManager","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_keyOwner","type":"address"}],"name":"keyExpirationTimestampFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"keyManagerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"keyManagerToNonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"keyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxNumberOfKeys","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numberOfOwners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"onKeyCancelHook","outputs":[{"internalType":"contract ILockKeyCancelHook","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"onKeyPurchaseHook","outputs":[{"internalType":"contract ILockKeyPurchaseHook","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"owners","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"publicLockVersion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"address","name":"_referrer","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"purchase","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"address","name":"_referrer","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"purchasePriceFor","outputs":[{"internalType":"uint256","name":"minKeyPrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"refundPenaltyBasisPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceLockManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_granter","type":"address"}],"name":"revokeKeyGranter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_baseTokenURI","type":"string"}],"name":"setBaseTokenURI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_onKeyPurchaseHook","type":"address"},{"internalType":"address","name":"_onKeyCancelHook","type":"address"}],"name":"setEventHooks","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_keyManager","type":"address"}],"name":"setKeyManagerOf","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_timeShared","type":"uint256"}],"name":"shareKey","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_keyOwner","type":"address"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"transferFeeBasisPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"unlockProtocol","outputs":[{"internalType":"contract IUnlock","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"}],"name":"updateBeneficiary","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_keyPrice","type":"uint256"},{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"updateKeyPricing","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_lockName","type":"string"}],"name":"updateLockName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_lockSymbol","type":"string"}],"name":"updateLockSymbol","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_freeTrialLength","type":"uint256"},{"internalType":"uint256","name":"_refundPenaltyBasisPoints","type":"uint256"}],"name":"updateRefundPenalty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_transferFeeBasisPoints","type":"uint256"}],"name":"updateTransferFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    
  const web3 =new Web3(window.ethereum);
  const unlockctrct = new web3.eth.Contract(abi,contractAddress);

 
  
  // function sduration(event) {
  //   setexpdur(event.target.value);
  //   console.log(event.target.value);
  // }
  let accounts;
  async function connect() {
    window.ethereum.enable();
    accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
  }

  function sprice(event) {
    setkeyprice(event.target.value);
    console.log(event.target.value);
  }

  function snoofkey(event) {
    setnoofkey(event.target.value);
   
    console.log(event.target.value);
  }
  function slockname(event) {
    setlockname(event.target.value);
    console.log(event.target.value);
  }
  

  async function createlock(){
    // try{
      const lockadd =  await unlockctrct.methods.createLock(315360000,
      '0x0000000000000000000000000000000000000000',
     keyprice,
      noofkey,
      lockname,
      '0x' + Crypto.randomBytes(12).toString('hex')
    ).send({from :accounts[0]});

    console.log(lockadd);
     console.log(lockadd.events.NewLock.returnValues.newLockAddress);
     const caddress = await lockadd.events.NewLock.returnValues.newLockAddress;
     console.log(caddress);

     setcreatedaddress(caddress);
     
     const publock = new web3.eth.Contract(pabi,caddress);
     const res =  await publock.methods.setBaseTokenURI("https://ipfs.io/ipfs/Qmd2JeP1vi7cpSuvBJmhjBK8bkhk5H6PzByMePGwXhjPt7").send({from :accounts[0]});
     console.log(res);
    
  }
  function newlockadd() {
    console.log(createdaddress);
  }

  function generatelink() {
   

      const ay = {
        "pessimistic": true,
        "locks": {
            createdaddress: {
               "network": 4,
               "name": "Huddlers"
            }
        },
        "icon": "https://ipfs.io/ipfs/Qmd2JeP1vi7cpSuvBJmhjBK8bkhk5H6PzByMePGwXhjPt7",
        "callToAction": {
            "default": "Testing 123"
        }
      };
      var url = 'https://app.unlock-protocol.com/checkout?paywallConfig=' + encodeURIComponent({
        "pessimistic": true,
        "locks": {
            createdaddress: {
               "network": 4,
               "name": "Huddlers"
            }
        },
        "icon": "https://ipfs.io/ipfs/Qmd2JeP1vi7cpSuvBJmhjBK8bkhk5H6PzByMePGwXhjPt7",
        "callToAction": {
            "default": "Testing 123"
        }
      });
        console.log(url);
     
  }
  

  
  return (
    <div className="App">
      <header className="App-header">
      <br></br>
      <br></br>
        <br></br>
        Price &nbsp;&nbsp;
        <br></br>
        <input type="text" onChange={sprice}></input>
        <br></br>

        <br></br>
        Number of keys &nbsp;&nbsp;
        <input type="text" onChange={snoofkey}></input>
        <br></br>

        <br></br>
        Name of Lock &nbsp;&nbsp;
        <input type="text" onChange={slockname}></input>
        <br></br>
        <button onClick={connect}>connect</button>
        <button onClick={createlock}>Create </button>
        <button onClick = {newlockadd}>Show Add</button>
        <button onClick ={generatelink}>link</button>
       </header>
    </div>
  );
  }

export default App;
