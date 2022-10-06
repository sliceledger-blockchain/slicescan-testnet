import React, {useState} from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { FaRegCopy, FaAngleDown } from 'react-icons/fa'
import { MdOutlineQrCode } from 'react-icons/md'
import {GiBackwardTime} from 'react-icons/gi'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ContractOverView() {
    const [showMore, setShowMore] = useState(false)
    const handleMoreDropdown = ()=>{
        setShowMore(!showMore)
    }
    return (
        <>
            <section className='contractOverView_section '>
                <Container>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='contractAddress'>
                                <img src='https://airnfts.s3.amazonaws.com/nft-images/20211017/Flower_1_1634471926850.jpg' className='img-fluid' alt='contract_img' />
                                <div className='contract_address'>Contract <span>0xCEF5E6370205FD84973A5Decc5bab23FcA18fFD7</span></div>
                                <div className='icons'>
                                    <div className='copy_icon'>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Copy address to clipboard</Tooltip>}>
                                            <span className="d-inline-block">
                                                <FaRegCopy />
                                            </span>
                                        </OverlayTrigger>

                                    </div>
                                    <div className='qrCode_icon'>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click to view QR Code</Tooltip>}>
                                            <span className="d-inline-block">
                                                <MdOutlineQrCode />
                                            </span>
                                        </OverlayTrigger>

                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} md={6}>
                            <div className='contract_overview py-4'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <div className='title'>Contract Overview</div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row balance_div'>
                                            <div className='col-md-4'>
                                                <div className='balance'>Balance:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='balance_price'>0.0000864 Slice</div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className='row token_div'>
                                            <div className='col-md-4'>
                                                <div className='token'>Token:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='token_select_dropdown'>
                                                    <div className='token_select_text'>$0.00 <span>2</span></div>
                                                    <div className='icon'><FaAngleDown/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={6}>
                            <div className='contract_overview py-4'>
                                <div className='card'>
                                    <div className='card-header'>
                                       <div className='title'>More Info</div>
                                       <div className='more_dropdown'>
                                        <div className='dropdown_head' onClick={handleMoreDropdown}>More <FaAngleDown/></div>
                                        {showMore ? <div className='dropdown_menu'><GiBackwardTime/> check Previous Balance</div> : "" }
                                        
                                       </div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row moreInfo_div'>
                                            <div className='col-md-4'>
                                                <div className='name'>My Name Tag:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='available'>Not Available</div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className='row contractCreator_div'>
                                            <div className='col-md-4'>
                                                <div className='contractCreator'>ContractCreator:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='contract_creator_address'>
                                                    <span className='copy_address'>
                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">creator address</Tooltip>}>
                                                            <span className="d-inline-block">
                                                                0xaa737df2b2c417520....
                                                            </span>
                                                        </OverlayTrigger>
                                                    </span>&nbsp;&nbsp;
                                                    <span>at txn</span>&nbsp;&nbsp;
                                                    <span className='copy_address'>
                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">creator Txn Hash</Tooltip>}>
                                                            <span className="d-inline-block">
                                                                0xfbb26512cce2b5930....
                                                            </span>
                                                        </OverlayTrigger>
                                                    </span>
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
        </>
    )
}

export default ContractOverView