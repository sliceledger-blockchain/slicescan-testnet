import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import { FaAngleLeft,FaAngleRight } from 'react-icons/fa';
import {Link} from "react-router-dom"
function SliceToken() {
    let address = "0xA52EC1AfAddA61f22312a070ae661aA1B9693762"
  return (
    <>
         <section className='account_details py-3'>
                <Container>
                    <Row>
                        <Col lg={12}>

                            <div className='account_head'>Token Tracker</div>
                            <hr />
                            <div className='account_table'>
                            <div className='ps-3 mb-3'>Slice-20 Tokens</div>
                                <Table responsive hover>
                                    <thead>
                                        <tr className='table_headings'>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Symbol</th>
                                            <th>Decimal</th>
                                            <th>Contract Address</th>
                                            <th>Total Supply</th>
                                            <th>Holders</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div >1</div>
                                            </td>
                                            <td>
                                                <div>Wrapped Slice </div>
                                            </td>
                                            <td>
                                                <div>WSLICE</div>
                                            </td>
                                            <td>
                                                <div>18</div>
                                            </td>
                                            <td>
                                                <div><Link to={`/address/${address}`}>{address.slice(0,4)}....{address.slice(-4, address.length)}</Link></div>
                                            </td>
                                            <td>
                                                <div> 1,000,000,000,000</div>
                                            </td>
                                            <td>
                                                <div>1</div>
                                            </td>
                                        	
                                        </tr>
                                    </tbody>
                                </Table>

                                {/* <div className="pagination_div">
                                    <div className='show_count'>
                                        show &nbsp;<span>10</span>&nbsp; Records
                                    </div>
                                    <div className="paginate_count">
                                        <span>First</span>&nbsp;&nbsp;
                                        <span><FaAngleLeft /></span>&nbsp;&nbsp;
                                        <span>1 of 200</span>&nbsp;&nbsp;
                                        <span><FaAngleRight /></span>&nbsp;&nbsp;
                                        <span>Last</span>
                                    </div>
                                </div> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
    </>
  )
}

export default SliceToken
