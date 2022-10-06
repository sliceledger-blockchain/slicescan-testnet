import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { Web3 } from '../../../Web3Provider';

const Account = () => {
    const [pageLimit, setPageLimit] = useState(10)
    const [allAddress, setAllAddress] = useState([])
    const [allAddressBalance, setAllAddressBalance] = useState([])
    const [allAddressTransactions, setAllAddressTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    const [latestTransactions, setLatestTransactions] = useState([])
    const [addressBalance, setAddressBalance] = useState([])

    useEffect(() => {
        Web3.eth.net.isListening()
            .then((data) => {
                if (data) {

                    Web3.eth.getBlockNumber(function (error, result) {
                        if (result) {
                            console.log("total blocks", result);
                            for (var i = 0; i <= result; i++) {

                                Web3.eth.getBlock(i)
                                    .then((result) => {
                                        if (result) {
                                            if (result.transactions) {
                                                if (result.transactions.length >= 1) {
                                                    for (let i = 0; i <= result.transactions.length; i++) {
                                                        Web3.eth.getTransaction(result.transactions[i]).then((e) => {
                                                            // console.log("Get ALl Blocks", e.from);

                                                            // Web3.eth.getBalance(e.from).then
                                                            // const uniqueAddress = [...new Set(e.from)];

                                                            // console.log("uniqueAddress=================>", uniqueAddress);
                                                            getTopAccountBalance(e.from)
                                                            // console.log("times called");
                                                            // if (e) {
                                                            //     setLatestTransactions(oldArray => [...oldArray, e.from]);
                                                            // }

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

                    // Web3.eth.getAccounts((err, acc) => {

                    //     setAllAddress(acc)
                    //     setLoading(false)
                    //     for (let i = 0; i < acc.length; i++) {

                    //         Web3.eth.getBalance(acc[i].toString()).then((e) => {
                    //             let balance = Web3.utils.fromWei(e);
                    //             setAllAddressBalance(e => [...e, balance])
                    //         })

                    //         Web3.eth.getTransactionCount(acc[i].toString()).then((e) => {
                    //             setAllAddressTransactions(data => [...data, e])
                    //         })

                    //     }


                    // })

                }
            })
    }, [])


    const [FinalArray, setFinalArray] = useState([])

    async function getTopAccountBalance(params) {
        let AddressBalance = await Web3.eth.getBalance(params).then(e => {
            return Web3.utils.fromWei(e)
        })

        let AddressTransactionCount = await Web3.eth.getTransactionCount(params).then(e => {
            return e
        })

        const filteredObj = {
            address: params,
            balance: AddressBalance,
            transactionCount: AddressTransactionCount
        }

        setFinalArray(e => [filteredObj, ...e])


        // console.log("filteredObj", filteredObj);
    }

    // for (let i = 0; i < FinalArray.length; i++) {
    //     if (FinalArray[i] === FinalArray[i + 1]) {
    //         console.log("if", FinalArray);
    //     } else {
    //         console.log("else", FinalArray);
    //     }

    // }

    // console.log("FinalArray", FinalArray.filter((e, index, arr) => {

    //     console.log("demo for testing", arr);

    //     // if (e.address === e.address) {

    //     // }{
    //     //     return e
    //     // }
    // }));

    useEffect(() => {
        
        const uniqueAddress = [...new Map(FinalArray.map((item) => [item["address"], item])).values()];
        setAllAddress(e => [...uniqueAddress, ...e])
      
    }, [FinalArray])
    

    
    // if (uniqueAddress.length ++) console.log("not increase");
    //     console.count("changed")


    // const [AccountBalance, setAccountBalance] = useState([])

    // var p = []
    // for (let i = 0; i < uniqueAddress.length; i++) {
    //     // console.log("address", uniqueAddress[i]);
    //     Web3.eth.getBalance(uniqueAddress[i]).then((e) => {
    //         let balance = Web3.utils.fromWei(e);
    //         console.log("balance", balance);
    //         // p.push(balance)
    //         // setAccountBalance(e => [ balance, ...e])
    //     })
    // }

    // console.log("AccountBalance", AccountBalance);


    // =============all Collections pagination start===============
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = Number(pageLimit);


    useEffect(() => {
        let filterArray = [...new Map(allAddress.map((item) => [item["address"], item])).values()];
        // console.log("allAddress", filterArray);
        if (filterArray) {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(filterArray.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(filterArray.length / itemsPerPage));
        } else {

        }
    }, [allAddress, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        let filterArray = [...new Map(allAddress.map((item) => [item["address"], item])).values()];
        const newOffset =
            (event.selected * itemsPerPage) % filterArray.length;
        setItemOffset(newOffset);
    };
    // =============all Collections pagination end===============


    return (
        <>
            <section className='account_details py-3'>
                <Container>
                    <Row>
                        <Col lg={12}>

                            <div className='account_head'>Top Accounts by Slice Balance </div>
                            <hr />
                            <div className='account_table'>
                                {
                                    currentItems.length > 0 ?
                                        <>
                                            <Table responsive hover>
                                                <thead>
                                                    <tr className='table_headings'>
                                                        <th>Rank</th>
                                                        <th>Address </th>
                                                        <th>Balance</th>

                                                        <th>Transaction Count</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ position: 'relative' }}>

                                                    {currentItems.sort((a, b) => b.transactionCount - a.transactionCount).map(({ address, balance, transactionCount }, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div >{index + itemOffset + 1}</div>
                                                                </td>
                                                                <td>
                                                                    <div><Link to={`/address/${address}`} className='transaction_details'>{address.slice(0, 4)}....{address.slice(-4, address.length)}</Link></div>
                                                                </td>
                                                                <td>
                                                                    <div>{balance}</div>
                                                                </td>

                                                                <td>
                                                                    <div>{transactionCount}</div>
                                                                </td>

                                                            </tr>
                                                        )
                                                    })
                                                    }
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
                                                        onPageChange={handlePageClick}
                                                        pageRangeDisplayed={1}
                                                        marginPagesDisplayed={1}
                                                        pageCount={pageCount}
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
                                        </>
                                        :

                                        <div className='text-center topAccount_loader' style={{ padding: "200px" }}>
                                            <Spinner animation="border" variant="primary" size="sm" />
                                        </div>

                                    // {/* // <tr>
                                    // //     <td colSpan={3}>No Accounts</td>
                                    // // </tr> */}
                                }




                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>


        </>
    )
}

export default Account;
