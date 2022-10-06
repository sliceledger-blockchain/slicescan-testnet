import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { BiCopy, BiTimeFive } from 'react-icons/bi'
import { BsQuestionCircle } from 'react-icons/bs'
import { FaCheckCircle } from 'react-icons/fa'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Hero from '../landing/Hero'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { Web3 } from '../../../Web3Provider';



function TransactionContractDetails() {
    const [result, setResult] = useState();
    const [time, setTime] = useState()
    const [latestBlock, setLatestBlock] = useState()
    const [copyTextSourceCode, setCopyTextSourceCode] = useState("Copy address to clipboard")
    const [status, setStatus] = useState("")
    let id = useParams()


    const handleSourceCopy = () => {
        setCopyTextSourceCode("Copied.")
    }




    useEffect(() => {
        if (id.txnhash) {
            Web3.eth.net.isListening()
                .then((data) => {
                    if (data) {
                        Web3.eth.getTransaction(id.txnhash)
                            .then((data) => {
                                // console.log("data", data)
                                if (data) {
                                    if (data.blockNumber) {
                                        Web3.eth.getBlock(data.blockNumber)
                                            .then((data) => {
                                                if (data) {
                                                    //  console.log("data timestap", data)
                                                    setTime(data.timestamp)
                                                }
                                            })
                                            .catch((error) => {
                                                console.log("error", error)
                                            })
                                    }
                                    setResult(data)
                                }
                            })
                            .catch((error) => {
                                console.log("error", error)
                            })


                        Web3.eth.getBlockNumber()
                            .then((data) => {
                                if (data) {
                                    setLatestBlock(data)

                                }
                            })
                            .catch((error) => {
                                console.log("error", error)
                            })
                    }
                })
                .catch((error) => {
                    console.log("error", error)
                })
        }

    }, [id.txnhash])



    if (result) {
        var value = Web3.utils.fromWei(result.value.toString(), 'ether');
        var slicevalue = Number(value).toFixed(2);

        Web3.eth.getTransactionReceipt(result.hash).then((data) => {
            setStatus(data.status)
        })
    }


    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {copyTextSourceCode}
        </Tooltip>
    );

    function blockCreatedTime(timeStamp) {
        let millisecond = timeStamp * 1000;
        let currentDate = new Date()
        let CurrentMillisecond = currentDate.getTime()
        const created = CurrentMillisecond - millisecond;
        const secondAgo = Math.round(created / 1000)
        const minuteAgo = Math.round(created / 1000 / 60)
        const hourAgo = Math.floor(created / 1000 / 60 / 60)
        const days = Math.floor(created / (24 * 60 * 60 * 1000));
        const month = Math.floor(days / 30);
        const year = Math.floor(month / 12);

        let finalValue = null;
        if (secondAgo < 2) {
            finalValue = `just now`;
        } else if (secondAgo < 60) {
            finalValue = `${secondAgo} seconds ago`;
        } else if (minuteAgo <= 60) {
            finalValue = `${minuteAgo} minutes ago`
        } else if (hourAgo < 24) {
            finalValue = `${hourAgo} hour ago`
        } else if (hourAgo >= 24 && days <= 31) {
            finalValue = `${days} day ago`
        } else if (days > 30 && month <= 12) {
            finalValue = `${month} month ago`
        } else if (month > 12) {
            finalValue = `${year} year ago`
        }
        return (
            { finalValue }
        );
    }

 
//    function utcConverter(param){
// let p = (new Date(param)).toUTCString()
//     return p 
//    }


   function utcConverter(d){
    d= new Date(d);
    var tail= 'UTC', D= [d.getUTCFullYear(), d.getUTCMonth()+1, d.getUTCDate()],
    T= [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()];
    if(+T[0]> 12){
        T[0]-= 12;
        tail= ' pm '+'+'+tail;
    }
    else tail= ' am '+'+'+tail;
    var i= 3;
    while(i){
        --i;
        if(D[i]<10) D[i]= '0'+D[i];
        if(T[i]<10) T[i]= '0'+T[i];
    }
    return D.join('-')+' '+T.join(':')+ tail;
}



// var m = moment(new Date(1664881250000)).utc().utcOffset("-06:30").format("YYYY-MM-DD HH:mm:ss z");
// console.log("UTC-06:00 -> " + m);


    return (
        <>
            <section className='innerHeroSection'> <Hero /></section>

            {result ?
                <section className='transaction_contract_details py-3'>
                    <Container>
                        <Row>
                            <Col lg={12} md={12}>
                                <div className='transaction_head'>Transaction Details</div>
                                <hr />
                                <div className='card my-4'>
                                    <div className='card-header'>Overview</div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> TXN#</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side'>{result.hash}


                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 250 }}
                                                        overlay={renderTooltip}

                                                    >
                                                        <CopyToClipboard text={result.hash}>
                                                            <BiCopy onClick={handleSourceCopy} />
                                                        </CopyToClipboard>
                                                    </OverlayTrigger>



                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Status</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side success'><FaCheckCircle />{status == true ? "Success" : "Failed"}</div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Block</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>
                                                    <Link to={`/block_details/block/${result.blockNumber}`}>{result.blockNumber}</Link><span className='block_bg'>{latestBlock - result.blockNumber} Block Confirmations</span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Timestamp</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>
                                                    <BiTimeFive style={{ marginTop: "-3px" }} />  <span>{blockCreatedTime(time).finalValue} <span>&#40;</span>{utcConverter(time*1000)}<span>&#41;</span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> From</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>
                                                    <Link to={`/address/${result.from}`}>{result.from}</Link>

                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 300 }}
                                                        overlay={renderTooltip}

                                                    >
                                                        <CopyToClipboard text={result.hash}>
                                                            <BiCopy onClick={handleSourceCopy} />
                                                        </CopyToClipboard>
                                                    </OverlayTrigger>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>


                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> To</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>
                                                    <Link to={`/address/${result.to}`}>{result.to}</Link>

                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 300 }}
                                                        overlay={renderTooltip}

                                                    >
                                                        <CopyToClipboard text={result.hash}>
                                                            <BiCopy onClick={handleSourceCopy} />
                                                        </CopyToClipboard>
                                                    </OverlayTrigger>

                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Value</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>
                                                    <span className='slice_value'>   {
                                                        slicevalue
                                                    } Slice </span> ($0.00)

                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle />  Transaction Fee</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>
                                                    {
                                                        Web3.utils.fromWei((result.gas * result.gasPrice).toString(), 'ether')

                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='showMore_data'>


                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <div className='left_side'><BsQuestionCircle />Gas Price</div>
                                                </div>
                                                <div className='col-md-8'>
                                                    <div className='right_side '>
                                                        {
                                                            Web3.utils.fromWei(result.gasPrice.toString(), 'ether')

                                                        } Slice({Web3.utils.fromWei(result.gasPrice.toString(), 'gwei')} Gwei)
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <div className='left_side'><BsQuestionCircle /> Gas Used By Transaction</div>
                                                </div>
                                                <div className='col-md-8'>
                                                    <div className='right_side '>
                                                        {result.gas}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <div className='left_side'><BsQuestionCircle /> Nonce</div>
                                                </div>
                                                <div className='col-md-8'>
                                                    <div className='right_side '>
                                                        {result.nonce}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>

                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <div className='left_side'><BsQuestionCircle />  Input Data</div>
                                                </div>
                                                <div className='col-md-8'>
                                                    <div className='right_side input_data_address' style={{ height: result.input.length > 120 ? "130px" : "auto" }}>
                                                        {result.input}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </section>
                :
                <section className='transaction_contract_details py-3'>
                    <Container>
                        <Row>
                            <Col lg={12} md={12}>
                                <div className='transaction_head'>Transaction Details</div>
                                <hr />
                                <div className='spinner my-4'>
                                    <Spinner animation="border" variant="primary" size="sm" />
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </section>

            }

        </>
    )
}

export default TransactionContractDetails