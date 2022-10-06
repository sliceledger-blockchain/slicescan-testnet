import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../components/pages/signIn/SignIn';
import Landing from '../components/pages/landing/Landing';
import SignUp from '../components/pages/signUp/SignUp';
import ContractTransaction from '../components/pages/contractTransactions/ContractTransaction';
import TransactionContractDetails from '../components/pages/contractTransactions/TransactionContractDetails';
import Address from '../components/pages/address/Address';
import Account from '../components/pages/account/Account';
import Block from '../components/pages/block/Block'
import AllTransaction from '../components/pages/allTransaction/AllTransaction';
import BlockDetails from '../components/pages/block/BlockDetails';
import PendingTxn from '../components/pages/pending_txn/PendingTxn';
import Valitors from '../components/pages/valitorsLeaderboard/Valitors';
import SliceToken from '../components/pages/slice20Token/SliceToken';
import ContractVerified from '../components/pages/contractVerified/ContractVerified';
import VerifyContract from '../components/pages/verifyContract/VerifyContract';
import VerifyPublish from '../components/pages/verifyContract/VerifyPublish';
import ForgotPassword from '../components/pages/signIn/ForgotPassword';
import Main from '../components/pages/verifyContract/Main';
import VerifyAccount from '../components/pages/signUp/VerifyAccount';
import ConfirmEmail from '../components/pages/signUp/ConfirmEmail';
import ResetPassword from '../components/pages/signIn/ResetPassword';
import MyProfile from '../components/common/MyProfile';



const Index = () => {

 return (
        <>
            <BrowserRouter basename='/'>
                <Header />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/verify_account" element={<VerifyAccount />} />
                    <Route path="/confirmemail" element={<ConfirmEmail />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/resetPassword" element={<ResetPassword />} />
                    <Route path="/myaccount" element={<MyProfile />} />
                    <Route path="/contract" element={<ContractTransaction />} />
                    <Route path="/transaction_details/tx/:txnhash" element={<TransactionContractDetails />} />
                    <Route path="/address/:address" element={<Address />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/block" element={<Block />} />
                    <Route path="/alltransaction" element={<AllTransaction />} />
                    <Route path="/block_details/block/:number" element={<BlockDetails />} />
                    <Route path="/pending_txn" element={<PendingTxn />} />
                    <Route path="/valitors" element={<Valitors />}></Route>
                    <Route path="/slice20token" element={<SliceToken />}></Route>
                    <Route path="/contractsVerified" element={<ContractVerified />} />
                    <Route path="/verifyContract" element={<VerifyContract />} />
                    <Route path="/verifyAndPublishContract" element={<VerifyPublish />} />
                    <Route path="/main_verify_contract  " element={<Main />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}





export default Index



// 
// "homepage": "https://testnet-slicescan.io"
// "homepage": "https://slicescan.io"