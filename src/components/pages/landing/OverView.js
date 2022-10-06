import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import web3 from 'web3';
import { Web3 } from '../../../Web3Provider';
import logo from '../../../asset/image/logo.png';


const OverView = () => {
    const darkmode = useSelector((state) => state.theme.darkmode);
    const [totalBlock, setTotalBlock] = useState('');
    const [totalAccount, setTotalAccount] = useState('');
    const [gasPrice, setGasPrice] = useState('');
    const [totalTransactions, setTotalTransactions] = useState("")
    const [latestTransactions, setLatestTransactions] = useState([])

    //convert ether to Gwei
    const gweiGasPrice = web3.utils.fromWei(gasPrice, 'gwei')

    let sum = 0

    useEffect(() => {
        Web3.eth.net.isListening()
            .then((data) => {
                
                if (data) {

                    // getblocknumber
                    Web3.eth.getBlockNumber(function (error, result) {
                        if (result) {

                            setTotalBlock(result)

                            for (let i = 0; i <= result; i++) {
                                Web3.eth.getBlock(i)
                                    .then((result) => {
                                        if (result) {
                                            if (result.transactions) {
                                                if (result.transactions.length >0) {
                                                    sum += result.transactions.length;
                                                    setTotalTransactions(sum)
                                                }
                                                if(result.transactions.length>=1){
                                                    for (let i = 0; i <= result.transactions.length; i++) {
                                                        Web3.eth.getTransaction(result.transactions[i]).then(
                                                            (e) => {
                                                                if (e) {
                                                                    setLatestTransactions(oldArray => [...oldArray, e]);
                                                                }

                                                            }
                                                        )
                                                    }
                                                }

                                            }

                                        }
                                    })
                                    .catch((error) => {
                                        console.log("error", error)
                                    })
                            }
                        }
                        if (error) {
                            console.log("error", error)
                        }
                    });
                }



                //getaccount
                Web3.eth.getAccounts(function (error, result) {
                    if (result) {
                        setTotalAccount(result.length)
                    }
                    if (error) {
                        console.log("error", error)
                    }
                })




                // getgasprice
                Web3.eth.getGasPrice(function (error, result) {
                    if (result) {
                        setGasPrice(result)
                    }
                    if (error) {
                        console.log("error", error)
                    }
                });
            })

            .catch((error) => {
                console.log("error", error)
            })
    }, [])


    function blockFormatter(num) {

        if (num >= 1000000000000) {
            return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
        }
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

     const uniqueAccount = [...new Set(latestTransactions.map(item => item.from))];
   

    return (
        <>
            <section className={`overView_wrap ${!darkmode ? "" : "dark_mode"}`}>
                <Container fluid>
                    <Row className='justify-content-center'>
                        <Col xl={9} lg={11}>
                            <div className={`overView_card ${!darkmode ? "" : "dark_mode"}`}>
                                <Row>
                                    <Col  md={6} lg={3} xl={3}>
                                        <div className='overView_details'>
                                            <img src={logo} className="img-fluid logo_icon"></img>
                                            <article className='overView_card_details'>
                                                <p>SLICE PRICE</p>
                                                <p>0 @ BTC (0%)</p>
                                            </article>
                                        </div>
                                    </Col>
                                    <Col  md={6} lg={3} xl={3}>
                                        <div className='overView_details'>
                                            <img src={logo} className="img-fluid logo_icon"></img>
                                            <article className='overView_card_details'>
                                                <p>TOTAL BLOCKS</p>
                                                <p><Link to="/block">{blockFormatter(totalBlock)}</Link></p>
                                            </article>
                                        </div>
                                    </Col>
                                    <Col  md={6} lg={3} xl={3}>
                                        <div className='overView_details'>
                                            <img src={logo} className="img-fluid logo_icon"></img>
                                            <article className='overView_card_details'>
                                                <p>TOTAL SUPPLY SLICE</p>
                                                <p>1,000,000,000,000</p>
                                            </article>
                                        </div>
                                    </Col>
                                    <Col  md={6} lg={3} xl={3}>
                                        <div className='overView_details'>
                                            <img src={logo} className="img-fluid logo_icon"></img>
                                            <article className='overView_card_details'>
                                                <p>GAS PRICE</p>
                                                <p>{gweiGasPrice} Gwei</p>
                                            </article>
                                        </div>
                                    </Col>
                                    <div className='overView_card_details_sec'>
                                        <Row>
                                            <Col  md={6} lg={3} xl={3}>
                                                <div className='overView_details'>
                                                    <img src={logo} className="img-fluid logo_icon"></img>
                                                    <article className='overView_card_details'>
                                                        <p>MARKET CAP</p>
                                                        <p>$0</p>
                                                    </article>
                                                </div>
                                            </Col>
                                            <Col  md={6} lg={3} xl={3}>
                                                <div className='overView_details'>
                                                    <img src={logo} className="img-fluid logo_icon"></img>
                                                    <article className='overView_card_details'>
                                                        <p>TOTAL TRANSACTIONS</p>
                                                        <p>{blockFormatter(totalTransactions)}</p>
                                                    </article>
                                                </div>
                                            </Col>
                                            <Col  md={6} lg={3} xl={3}>
                                                <div className='overView_details'>
                                                    <img src={logo} className="img-fluid logo_icon"></img>
                                                    <article className='overView_card_details'>
                                                        <p>TOTAL ACCOUNTS</p>
                                                        <p><Link to="/account">{uniqueAccount.length}</Link></p>
                                                    </article>
                                                </div>
                                            </Col>
                                            <Col  md={6} lg={3} xl={3}>
                                                <div className='overView_details last'>
                                                    <img src={logo} className="img-fluid logo_icon"></img>
                                                    <article className='overView_card_details'>
                                                        <p>EPOCH</p>
                                                        <p>0</p>
                                                    </article>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section>
        </>
    )
}

export default OverView