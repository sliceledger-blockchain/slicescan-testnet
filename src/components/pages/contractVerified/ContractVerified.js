import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ContractVerified() {
    return (
        <>
            <section className='contractVerified_wrap'>
                <Container>
                    <Row>
                        <Col lg={12}>

                            <div className='contract_head'>Contracts <span>With verified source codes only</span></div>
                            <hr />
                            <div className='contract_table'>
                                <Table responsive hover>
                                    <thead>
                                        <tr className='table_headings'>
                                            <th>Id</th>
                                            <th>Address</th>
                                            <th>Contract Name</th>
                                            <th>Compiler version</th>
                                            <th>Optimization</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div >1</div>
                                            </td>
                                            <td>
                                                <div><Link to="/address" className='transaction_details'>0x0000000000000000000000000000000000002001</Link></div>
                                            </td>
                                            <td>
                                                <div >IgniteBody</div>
                                            </td>
                                            <td>
                                                <div>v0.8.3+commit.8d00100c</div>
                                            </td>
                                            <td>
                                                <div>No</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div >2</div>
                                            </td>
                                            <td>
                                                <div><Link to="/address" className='transaction_details'>0x0000000000000000000000000000000000002001</Link></div>
                                            </td>
                                            <td>
                                                <div >IgniteDelegator</div>
                                            </td>
                                            <td>
                                                <div>v0.8.3+commit.8d00100c</div>
                                            </td>
                                            <td>
                                                <div>No</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div >3</div>
                                            </td>
                                            <td>
                                                <div><Link to="/address" className='transaction_details'>0x0000000000000000000000000000000000002001</Link></div>
                                            </td>
                                            <td>
                                                <div >IgniteDelegator</div>
                                            </td>
                                            <td>
                                                <div>v0.8.3+commit.8d00100c</div>
                                            </td>
                                            <td>
                                                <div>No</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div >4</div>
                                            </td>
                                            <td>
                                                <div><Link to="/address" className='transaction_details'>0x0000000000000000000000000000000000002001</Link></div>
                                            </td>
                                            <td>
                                                <div >IgniteDelegator</div>
                                            </td>
                                            <td>
                                                <div>v0.8.3+commit.8d00100c</div>
                                            </td>
                                            <td>
                                                <div>No</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div >5</div>
                                            </td>
                                            <td>
                                                <div><Link to="/address" className='transaction_details'>0x0000000000000000000000000000000000002001</Link></div>
                                            </td>
                                            <td>
                                                <div >IgniteDelegator</div>
                                            </td>
                                            <td>
                                                <div>v0.8.3+commit.8d00100c</div>
                                            </td>
                                            <td>
                                                <div>No</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div >6</div>
                                            </td>
                                            <td>
                                                <div><Link to="/address" className='transaction_details'>0x0000000000000000000000000000000000002001</Link></div>
                                            </td>
                                            <td>
                                                <div >IgniteDelegator</div>
                                            </td>
                                            <td>
                                                <div>v0.8.3+commit.8d00100c</div>
                                            </td>
                                            <td>
                                                <div>No</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div >7</div>
                                            </td>
                                            <td>
                                                <div><Link to="/address" className='transaction_details'>0x0000000000000000000000000000000000002001</Link></div>
                                            </td>
                                            <td>
                                                <div >IgniteDelegator</div>
                                            </td>
                                            <td>
                                                <div>v0.8.3+commit.8d00100c</div>
                                            </td>
                                            <td>
                                                <div>No</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div >8</div>
                                            </td>
                                            <td>
                                                <div><Link to="/address" className='transaction_details'>0x0000000000000000000000000000000000002001</Link></div>
                                            </td>
                                            <td>
                                                <div >IgniteDelegator</div>
                                            </td>
                                            <td>
                                                <div>v0.8.3+commit.8d00100c</div>
                                            </td>
                                            <td>
                                                <div>No</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div >9</div>
                                            </td>
                                            <td>
                                                <div><Link to="/address" className='transaction_details'>0x0000000000000000000000000000000000002001</Link></div>
                                            </td>
                                            <td>
                                                <div >IgniteDelegator</div>
                                            </td>
                                            <td>
                                                <div>v0.8.3+commit.8d00100c</div>
                                            </td>
                                            <td>
                                                <div>No</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div >10</div>
                                            </td>
                                            <td>
                                                <div><Link to="/address" className='transaction_details'>0x0000000000000000000000000000000000002001</Link></div>
                                            </td>
                                            <td>
                                                <div >IgniteCommunityToken</div>
                                            </td>
                                            <td>
                                                <div>v0.8.3+commit.8d00100c</div>
                                            </td>
                                            <td>
                                                <div>No</div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </Table>

                                <div className="pagination_div">
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
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ContractVerified