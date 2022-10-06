import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FaRegCopy } from 'react-icons/fa'
import { MdOutlineQrCode } from 'react-icons/md'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useSelector } from "react-redux";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Web3 } from '../../../Web3Provider'


var ETH_API_KEY = process.env.REACT_APP_ETH_API_KEY;
var ETH_BASE_URL = process.env.REACT_APP_ETH_BASE_URL;

function AddressOverview() {
    const [copyTextSourceCode, setCopyTextSourceCode] = useState("Copy address to clipboard")
    const [AccountBal, setAccountBal] = useState('')

    var location = useLocation()
    var address = location.pathname.split("address/")[1];
    const [balance, setBalance] = useState();


    const darkmode = useSelector((state) => state.data.totalBlock);
    // console.log("darkmode", darkmode)




    Web3.eth.getBalance(address).then(balance => {;
        const WeiToEth = Web3.utils.fromWei(balance, 'ether')
        setAccountBal(WeiToEth)
    });

    


    var demo = Web3.utils.fromWei('1', 'ether');

    const handleSourceCopy = () => {
        if(copyTextSourceCode === "Copy address to clipboard"){
            setCopyTextSourceCode("Copied.")
        }
        
    }
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {copyTextSourceCode}
        </Tooltip>
    );
    const [AddressCheck, setAddressCheck] = useState(false)

    useEffect(() => {
        //Contract and Wallet Address Check
        Web3.eth.getCode(address).then(e => {
            // console.log("e get Code", e, e.length);
            if (e.length > 2) {
                // console.log("Contract Address");
                setAddressCheck(true)
            } else {
                // console.log("Wallet Address");
                setAddressCheck(false)
            }
        })
    },[address])


    return (
        <>
            <section className='addressOverView_section mt-4'>
                <Container>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='contractAddress'>
                                <img src='https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/main_image_star-forming_region_carina_nircam_final-1280.jpg' className='img-fluid' alt='contract_img' />
                                <div className='contract_address'>{AddressCheck ? 'Contract Address' : 'Wallet Address'} <span>{address}</span></div>
                                <div className='icons'>
                                    <div className='copy_icon'>
                                     
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 250 }}
                                            overlay={renderTooltip}

                                        >
                                            <CopyToClipboard text={address}>
                                            <span className="d-inline-block"><FaRegCopy onClick={handleSourceCopy} /> </span>
                                            </CopyToClipboard>
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
                        <Col lg={6} md={12}>
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
                                                <div className='balance_price'>{AccountBal} Slice</div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className='row token_div'>
                                            <div className='col-md-4'>
                                                <div className='token'>Total Balance:</div>
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='balance_price'>
                                                    ${AccountBal * 0.02}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={12}>
                            <div className='contract_overview py-4'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <div className='title'>More Info</div>
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
                                        <div className='row contractCreator_div py-2'>
                                            <div className='col-md-4'>
                                                {/* <div className='contractCreator'>ContractCreator:</div> */}
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='contract_creator_address'>
                                                    {/* <span className='copy_address'>
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
                                                    </span> */}
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

export default AddressOverview