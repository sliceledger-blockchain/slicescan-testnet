
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tooltip, Spinner } from 'react-bootstrap'
import { BiTimeFive } from 'react-icons/bi'
import { BsQuestionCircle } from 'react-icons/bs'
import { useLocation } from 'react-router-dom';
import { Web3 } from '../../../Web3Provider'
import Hero from '../landing/Hero'


function BlockDetails() {
    const [blockDetails, setBlockDetails] = useState()
    var location = useLocation()
    var blockNumber = location.pathname.split("block/")[1];
    var yourNumber = Number(blockNumber);


    useEffect(() => {
        Web3.eth.net.isListening()
        .then((data) => {
            if(data){
                Web3.eth.getBlock(yourNumber)
                .then((data) => {
                    
                    if (data) {
                        setBlockDetails(data)
                    }
                })
                .catch((error) => {
                    console.log("error", error)
                })
            }
        })
        .catch((error) => {
            console.log("error",error)
        })
       

    },[blockNumber])

 
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
        } else if (hourAgo >= 24 && days <= 31 ) {
          finalValue = `${days} day ago`
        }else if(days > 30 &&  month <= 12){
          finalValue = `${month} month ago`
        }else if(month > 12){
          finalValue = `${year} year ago`
        }
        return (
          { finalValue }
        );
    }


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

    return (
        <>
            <section className='innerHeroSection'> <Hero /></section>
            {blockDetails ?
                <section className='block_details py-3'>
                    <Container>
                        <Row>
                            <Col lg={12} md={12}>
                                <div className='transaction_head'>Block <span>{blockDetails.number}</span></div>
                                <hr />
                                <div className='card my-4'>
                                    <div className='card-header'>Overview</div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Block Height:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side'>{blockDetails.number} </div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Timestamp:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '><BiTimeFive /> {blockCreatedTime(blockDetails.timestamp).finalValue} <span>&#40;</span>{utcConverter(blockDetails.timestamp*1000)}<span>&#41;</span></div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Transactions:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>
                                                    <span className='block_bg'>{blockDetails.transactions.length}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>


                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Block Hash:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side'> {blockDetails.hash}</div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle />  Parent Hash:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>{blockDetails.parentHash}</div>
                                            </div>
                                        </div>
                                        <hr></hr>


                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Difficulty:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>
                                                    {blockDetails.difficulty}
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Size:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>

                                                    {blockDetails.size} bytes
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Gas Used:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>
                                                    {blockDetails.gasUsed}
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='left_side'><BsQuestionCircle /> Gas Limit:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='right_side '>
                                                    {blockDetails.gasLimit}
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>



                                    </div>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </section>
                :
                <>

                    <section className='block_details py-3'>
                        <Container>
                            <Row>
                                <Col lg={12} md={12}>
                                    <div className='transaction_head'>Block</div>
                                    <hr />
                                    <div className='loadingcard my-4' style={{ height: "500px" }}>

                                        <Spinner animation="border" variant="primary" size="sm" />

                                    </div>

                                </Col>
                            </Row>
                        </Container>
                    </section>

                </>
            }


        </>
    )
}

export default BlockDetails