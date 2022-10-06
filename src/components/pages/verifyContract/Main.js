import React from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import ValidateContract from './ValidateContract'
import VerifyPublish from './VerifyPublish'

function Main() {
    return (
        <>
            <section className='verify_main_wrap'>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={12}>
                            <div className='verify_publish_head'>
                                <div className='main_head'>Verify & Publish Contract Source Code</div>
                                <div className="sub_head">Compiler Type: SINGLE FILE/CONCATENANTED METHOD</div>
                            </div>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={10}>
                            <div className='verify_contract_main'>
                                <div className='img_check'>
                                    Info:
                                </div>
                                <div className='para'>
                                    A simple and structed interface for verifying smart contract that fit in a single file
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <div className='verify_contract_tab'>
                                <Tabs
                                    defaultActiveKey="Contract Source Code"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="Contract Source Code" title="Contract Source Code">
                                        <VerifyPublish />
                                    </Tab>
                                    <Tab eventKey="Compiler Output" title="Compiler Output">
                                        <ValidateContract />
                                    </Tab>


                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Main