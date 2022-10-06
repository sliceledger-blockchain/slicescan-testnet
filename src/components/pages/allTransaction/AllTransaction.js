import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Web3 } from '../../../Web3Provider';

const AllTransaction = () => {
    const [pageLimit, setPageLimit] = useState(10)
    const [latestTransactions, setLatestTransactions] = useState([])
    const [transactionsTime, setTransactionsTime] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        Web3.eth.net.isListening()
            .then((data) => {
                if (data) {
                    Web3.eth.getBlockNumber(function (error, result) {
                        if (result) {


                            for (var i = 0; i <= result; i++) {

                                Web3.eth.getBlock(i)
                                    .then((result) => {
                                  
                                        if (result) {
                                            if (result.transactions) {

                                                if (result.transactions.length >= 1) {

                                                    for (let i = 0; i <= result.transactions.length; i++) {

                                                        Web3.eth.getTransaction(result.transactions[i]).then(
                                                            (e) => {

                                                                if (e) {
                                                                    setLatestTransactions(oldArray => [e, ...oldArray]);
                                                                }
                                                                Web3.eth.getBlock(e.blockNumber).then((data) => {

                                                                    setTransactionsTime(a => [data.timestamp, ...a])
                                                                })
                                                            }
                                                        )
                                                    }
                                                }
                                            }
                                        }
                                    })
                                    .catch((error) => {
                                        console.log("error", error)
                                    })
                            }
                        }
                        if (error) {
                            console.log("error", error)
                        }
                    });
                }
            })
            .catch((error) => {
                console.log("error", error)
            })
    }, [])



    // =============all Collections pagination start===============
    const [currentItemsCollections, setCurrentItemsCollections] = useState([]);
    const [pageCountCollections, setPageCountCollections] = useState(0);
    const [itemOffsetCollections, setItemOffsetCollections] = useState(0);
    const itemsPerPageCollections = Number(pageLimit);


    useEffect(() => {
        if (latestTransactions) {
            const endOffsetCollections = itemOffsetCollections + itemsPerPageCollections;
            setCurrentItemsCollections(latestTransactions.slice(itemOffsetCollections, endOffsetCollections));
            setPageCountCollections(Math.ceil(latestTransactions.length / itemsPerPageCollections));
        } else {

        }
    }, [latestTransactions, itemOffsetCollections, itemsPerPageCollections]);

    const handlePageClickCollections = (event) => {
        const newOffsetCollections =
            (event.selected * itemsPerPageCollections) % latestTransactions.length;
        setItemOffsetCollections(newOffsetCollections);
    };
    // =============all Collections pagination end===============

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
        } else if (minuteAgo < 60) {
            finalValue = `${minuteAgo} minutes ago`
        } else if (hourAgo < 24) {
            finalValue = `${hourAgo} hour ago`
        } else if (hourAgo >= 24 && days <= 31) {
            finalValue = `${days} day ago`
        } else if (days > 30 && month <= 12) {
            finalValue = `${month} month ago`
        } else if (month > 12) {
            finalValue = `${year} year ago`
        }
        return (
            { finalValue }
        );
    }

    const [a, setA] = useState("")



    return (
        <>

            {!currentItemsCollections.length ?
                <section className='all_transaction_details py-3'>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className='all_transaction_head'>Transactions</div>
                                <hr />
                                <div className='all_transaction_loading'>
                                    <Spinner animation="border" variant="primary" size="sm" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                :

                <section className='all_transaction_details py-3'>
                    <Container>
                        <Row>
                            <Col lg={12}>

                                <div className='all_transaction_head'>Transactions </div>
                                <hr />
                                <div className='all_transaction_table'>
                                    <Table responsive hover>
                                        <thead>
                                            <tr className='table_headings'>

                                                <th>Hash</th>
                                                <th>Block</th>
                                                <th>Time</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Value</th>
                                                <th>Fee</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentItemsCollections.sort((a, b) => b.blockNumber - a.blockNumber).map((e, index) => {
                                                if (e.to == null) {

                                                    Web3.eth.getTransactionReceipt(e.hash)
                                                        .then((data) => {

                                                            let contractAddress = data.contractAddress
                                                            setA(contractAddress)

                                                        })
                                                }

                                                // console.log("hash", e.hash, e.to);
                                                return (

                                                    <tr key={index}>

                                                        <td>
                                                            <div><Link to={`/transaction_details/tx/${e.hash}`} className='transaction_details'>{e.hash.slice(0, 4)}...{e.hash.slice(-4, e.hash.length)}</Link></div>
                                                        </td>
                                                        <td>
                                                            <div><Link to={`/block_details/block/${e.blockNumber}`} className='transaction_details'>{e.blockNumber}</Link></div>
                                                        </td>
                                                        <td>
                                                            <div >{blockCreatedTime(transactionsTime.sort((a, b) => b - a)[index]).finalValue}</div>
                                                        </td>
                                                        <td>
                                                            <div className='transaction_details'>
                                                                {e.from ? <Link to={`/address/${e.from}`}>{e.from.slice(0, 4)}...{e.from.slice(-4, e.from.length)}</Link> : <div>-</div>}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='transaction_details'>
                                                                {(e.to !== null)
                                                                    ? <Link to={`/address/${e.to}`}>{e.to.slice(0, 4)}...{e.to.slice(-4, e.to.length)}</Link>
                                                                    :
                                                                    <div>

                                                                        {
                                                                            a &&
                                                                            <Link to={`/address/${a}`}>
                                                                                {a.slice(0, 4)}...{a.slice(-4, a.length)}
                                                                            </Link>
                                                                        }

                                                                    </div>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='transaction_details text-dark'>{Web3.utils.fromWei(e.value.toString(), 'ether')}SLICE</div>
                                                        </td>

                                                        <td>
                                                            <div className='transaction_details text-dark'> {Web3.utils.fromWei((e.gas * e.gasPrice).toString(), 'ether')}</div>
                                                        </td>
                                                    </tr>

                                                )
                                            })}
                                        </tbody>
                                    </Table>


                                    <div className="pagination_div">
                                        <div className='show_count'>

                                            <span>show</span>&nbsp;
                                            <select className='selectpagelimt' value={pageLimit} onChange={(e) => setPageLimit(e.target.value)}>
                                                <option value={10}>10</option>
                                                <option value={25}>25</option>
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
                                            </select>
                                            &nbsp;
                                            <span>records</span>
                                        </div>
                                        <div>

                                            <ReactPaginate
                                                breakLabel="..."
                                                nextLabel=" >>"
                                                onPageChange={handlePageClickCollections}
                                                pageRangeDisplayed={1}
                                                marginPagesDisplayed={1}
                                                pageCount={pageCountCollections}
                                                previousLabel="<< "
                                                containerClassName="pagination justify-content-end"
                                                pageClassName="page-item"
                                                pageLinkClassName="page-link"
                                                previousClassName="page-item"
                                                previousLinkClassName="page-link"
                                                nextClassName="page-item"
                                                nextLinkClassName="page-link"
                                                breakClassName="page-item"
                                                breakLinkClassName="page-link"
                                                activeClassName="active"
                                            />
                                        </div>

                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>





            }
        </>




    )
}

export default AllTransaction