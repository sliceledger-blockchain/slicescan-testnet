import React from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import TransactionTable from './TabComponents/TransactionTable'
function TransactionInfo() {
    return (
        <>
            <section className='transactionInfo_section'>
                <Container>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='transactionInfo_tabs'>
                                <Tabs
                                    defaultActiveKey="transactions"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="transactions" title="Transactions">
                                     <TransactionTable/>
                                    </Tab>
                                    <Tab eventKey="internal txns" title="Internal Txns">
                                        
                                    </Tab>
                                    <Tab eventKey="erc20 token txns" title="Erc20 Token Txns">
                                       
                                    </Tab>
                                    <Tab eventKey="erc21 token txns" title="Erc21 Token Txns">
                                      
                                    </Tab>
                                    <Tab eventKey="contract" title="Contract">
                                    
                                    </Tab>
                                    <Tab eventKey="events" title="Events">
                                     
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

export default TransactionInfo