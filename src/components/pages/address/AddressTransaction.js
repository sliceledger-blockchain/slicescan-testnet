import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import Transactions from './Transactions';
import Contract from './Contract'
import VerifyContract from './VerifyContract'
import { AiFillCheckCircle } from "react-icons/ai"
import { useLocation } from 'react-router-dom'
import axios from "axios";
import { Web3 } from '../../../Web3Provider'

function AddressTransaction() {
    var location = useLocation()
    var address = location.pathname.split("address/")[1];
    const [show, setShow] = useState(true)
    const [addressData, setAddressData] = useState([])
    var ETH_API_KEY = process.env.REACT_APP_ETH_API_KEY;
    var ETH_BASE_URL = process.env.REACT_APP_ETH_BASE_URL;


    var form_address = `${ETH_BASE_URL}contract&action=getsourcecode&address=${address}${ETH_API_KEY}`



    // useEffect(() => {
    //     axios.get(form_address)
    //         .then((data) => {
    //             if (data.data.result[0].ABI === "Contract source code not verified") {
    //                 setShow(false)
    //             }
    //             if (data.data.result[0].ABI !== "Contract source code not verified") {
    //                 setAddressData(data.data.result[0])
    //             }
    //         })
    //         .catch((error) => {
    //             console.log("error", error)
    //         })
    // })


    const [AddressCheck, setAddressCheck] = useState(false)

    useEffect(() => {
        Web3.eth.getCode(address).then(e => {
            if (e.length > 2) {
                setAddressCheck(true)
            } else {
                setAddressCheck(false)
            }
        })

    }, [])



    return (
        <>
            <section className='addresstransactionInfo_section mb-4'>
                <Container>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='transactionInfo_tabs'>

                                <nav>

                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">

                                        {AddressCheck ?
                                        <>
                                           <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Transactions</button>
                                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Contract</button>
                                        </>
        
                                            :
                                            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Transactions</button>
                                        }

                                    </div>
                                </nav>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <Transactions />
                                    </div>
                                    <div className="tab-pane fade " id="nav-contract" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <Contract addressData={addressData} />
                                    </div>
                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <VerifyContract />
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

export default AddressTransaction