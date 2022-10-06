import React, { useEffect, useState } from 'react';
import Blocks from './Blocks';
import Transactions from './Transactions';
import { Row, Container, Col } from "react-bootstrap";
import { useSelector } from "react-redux"


const BlocksAndTransactions = () => {
    const darkmode = useSelector((state) => state.theme.darkmode);
    const [allTransaction, setAllTransaction] = useState()

 return (
        <>
            <section className={`blocksAndTransactions_wrap ${!darkmode ? "" : "dark_mode"}`}>
                <Container fluid>
                    <Row className='justify-content-center'>
                        <Col xl={9} lg={11}>
                        <Row>
                        <Col md={12} lg={6} xl={6}>
                            <Blocks blocksData={allTransaction} />
                        </Col>
                        <Col md={12} lg={6} xl={6}>
                            <Transactions transactinData={allTransaction} />
                        </Col>
                    </Row>
                        </Col>
                    </Row>
                    
                </Container>
            </section>
        </>
    )
}

export default BlocksAndTransactions