import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

function PendingTxn() {
  return (
    <>


      <section className='block_details py-3'>
        <Container>
          <Row>
            <Col lg={12}>

              <div className='block_head'>Pending Transactions</div>
              <hr />
              <div className='block_table'>
                <p className='text-center'>No Transactions Found</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>

  )
}

export default PendingTxn
