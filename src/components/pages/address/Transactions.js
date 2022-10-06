import React, { useEffect, useState } from 'react'
import { Table, Spinner, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import { FaRegEye, FaCheckCircle } from 'react-icons/fa'
import { AiOutlineFileText } from 'react-icons/ai'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Web3 } from '../../../Web3Provider'



function Transactions() {
    var location = useLocation()
    const [allTransaction, setAllTransaction] = useState([])
    const [AllFilteredTimeStamp, setAllFilteredTimeStamp] = useState([])

    const [SliceTransferTxt, setSliceTransferTxt] = useState('')
    const [ContractMethodTxt, setContractMethodTxt] = useState([])

    // let allTransaction = new Array();
    var from = location.pathname.split("address/")[1];
    const [pageLimit, setPageLimit] = useState(10)
    const [load, setLoad] = useState(true)


    let [count, setCount] = useState(0)

    useEffect(() => {
        Web3.eth.getBlockNumber()
            .then((allBlock) => {
                if (allBlock) {

                    for (let i = 0; i < allBlock; i++) {
                        try {
                            Web3.eth.getBlock(i)
                                .then((getTransactions) => {
                                    if (getTransactions.transactions.length > 0) {


                                        for (let i = 0; i < getTransactions.transactions.length; i++) {

                                            Web3.eth.getTransaction(getTransactions.transactions[i]).then((contractAdd) => {
                                                // console.log("total transaction", contractAdd);
                                                // console.log("total transaction", contractAdd.input.slice(0, 10));

                                                // console.log('contractAdd.to', contractAdd.to);
                                                // console.log('contractAdd.from', contractAdd.from);
                                                // if (contractAdd.to === from) {
                                                //     setAllTransaction(demo => [contractAdd, ...demo])
                                                //     Web3.eth.getBlock(contractAdd.blockNumber).then((timeStampPara) => {
                                                //         setAllFilteredTimeStamp(para => [timeStampPara.timestamp, ...para])
                                                //     })
                                                // }

                                                if (contractAdd.to === from) {
                                                    setLoad(false)

                                                    if (contractAdd.input.slice(0, 10) === '0x') {
                                                        // console.log("Slice input equal to '0x' ");
                                                        // setSliceTransferTxt("Slice Transfer")
                                                    } else {
                                                        console.warn("It Enters (To)");
                                                        // console.log("Method Name", contractAdd.hash);
                                                        Web3.eth.getTransactionReceipt(contractAdd.hash).then(e => {
                                                            // console.log("Recipient", e.contractAddress);
                                                            if (e.contractAddress === null) {
                                                                getTransactionMethod(contractAdd.input.slice(0, 10))
                                                            } else {
                                                                // console.log("Set the Contract Address", e.contractAddress);
                                                                // setSliceTransferTxt("Slice Transfer")
                                                            }
                                                        });
                                                    }
                                                    // console.log("Method Name To ====== >", contractAdd);

                                                    // setAllTransaction(demo => [contractAdd, ...demo])
                                                    // Web3.eth.getBlock(contractAdd.blockNumber).then((timeStampPara) => {
                                                    //     setAllFilteredTimeStamp(para => [timeStampPara.timestamp, ...para])
                                                    // })
                                                }
                                                else {
                                                    // console.log("not Matched");
                                                    setLoad(false)
                                                }

                                                if (contractAdd.from === from) {
                                                    setLoad(false)

                                                    if (contractAdd.input.slice(0, 10) === '0x') {
                                                        // console.log("Slice input equal to '0x' ");
                                                        // setSliceTransferTxt("Slice Transfer")
                                                    } else {
                                                        console.warn("It Enters (From)");
                                                        Web3.eth.getTransactionReceipt(contractAdd.hash).then(e => {
                                                            // console.log("Recipient", e.contractAddress);
                                                            if (e.contractAddress === null) {
                                                                getTransactionMethod(contractAdd.input.slice(0, 10))
                                                            } else {
                                                                // console.log("Set the Contract Address", e.contractAddress);
                                                                // setSliceTransferTxt("Slice Transfer")
                                                            }
                                                        });
                                                    }


                                                    if (contractAdd.to === null) {
                                                        // console.log("contractAdd======>", contractAdd.hash);
                                                        setCount(count++)
                                                        getContractAddressForEmptyTo(contractAdd.hash)
                                                    }

                                                    console.log("Method Name", contractAdd);
                                                    setAllTransaction(demo => [contractAdd, ...demo])
                                                    Web3.eth.getBlock(contractAdd.blockNumber).then((timeStampPara) => {
                                                        setAllFilteredTimeStamp(para => [timeStampPara.timestamp, ...para])
                                                    })
                                                }
                                                else {
                                                    // console.log("not Matched");
                                                    setLoad(false)
                                                }
                                            })
                                        }

                                    } else {

                                    }
                                }).catch(e => console.log("my e", e))
                        } catch (error) {
                            console.log('catch', error, error);
                        }
                    }
                }
            });

    }, [])

    // const [IndexValue, setIndexValue] = useState([])

    let IndexValue = new Array();

    function ContractIndexValue(ContractAddressString) {
        // setIndexValue(a => [ContractAddressString, ...a])
        IndexValue.push(ContractAddressString)
        // console.log("IndexValue", IndexValue.length);
        return IndexValue.length
    }



    const [ContractAddNull, setContractAddNull] = useState([])

    async function getContractAddressForEmptyTo(params) {
        Web3.eth.getTransactionReceipt(params).then(e => {
            // return e.contractAddress
            setContractAddNull(a => [e.contractAddress, ...a])
        })
        // console.log("JSX =======>", address);
        return ContractAddNull
        //    let demo = await Web3.eth.getTransactionReceipt(params).then(e => {
        //         console.log("e JSX", e);
        //         return e.contractAddress
        //     })

        //     console.log("demoTest", demo);

        // return demo
    }


    // console.log("getContractAddressForEmptyTo()",getContractAddressForEmptyTo("0x9419c8308da3b276c8f2942fc0380e5622546b4a73624f18df411e4bc0a7264c"))



    async function getTransactionMethod(params) {
        // console.warn(params);
        const api = await axios.get(`https://www.4byte.directory/api/v1/signatures/?hex_signature=${params}`);
        const methodText = api.data.results.sort((a, b) => a.id - b.id)[0].text_signature;
        // console.log("getMethod =========>", methodText)
        setContractMethodTxt(a => [methodText, ...a])
    }



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
        } else if (minuteAgo <= 60) {
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



    // =============all Collections pagination start===============
    const [currentItemsCollections, setCurrentItemsCollections] = useState([]);
    const [pageCountCollections, setPageCountCollections] = useState(0);
    const [itemOffsetCollections, setItemOffsetCollections] = useState(0);
    const itemsPerPageCollections = Number(pageLimit);


    useEffect(() => {

        if (allTransaction) {
            const endOffsetCollections = itemOffsetCollections + itemsPerPageCollections;
            setCurrentItemsCollections(allTransaction.slice(itemOffsetCollections, endOffsetCollections));
            setPageCountCollections(Math.ceil(allTransaction.length / itemsPerPageCollections));
        } else {

        }
    }, [allTransaction, itemOffsetCollections, itemsPerPageCollections]);

    const handlePageClickCollections = (event) => {
        const newOffsetCollections =
            (event.selected * itemsPerPageCollections) % allTransaction.length;
        setItemOffsetCollections(newOffsetCollections);
    };

    const [a, setA] = useState("")

    useEffect(() => {
        Web3.eth.getTransactionCount("0x6FAa0Ee8D237D371da0659a81d8fE0b6f2612c5a").then(e=>{
            console.log("======================>", e);
        })
    }, [])




    return (
        <>

            {
                load ?

                    <section className='no_transaction_section'>
                        <div className='addresstransaction_loader'>
                            <Spinner animation="border" variant="primary" size="sm" />
                        </div>
                    </section>
                    :

                    (allTransaction.length === 0)

                        ?

                        <section className='no_transaction_section'>
                            <div className='no_transaction'>
                                <p>No transactions found</p>
                            </div>
                        </section>

                        :

                        <section className='addresstransaction_table_section'>

                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        {/* <th></th> */}
                                        <th>Txn Hash</th>
                                        <th>Method </th>
                                        <th>Block</th>
                                        <th className='blue'>Age</th>
                                        <th>From</th>
                                        <th></th>
                                        <th>To</th>
                                        <th>Value</th>
                                        <th className='blue'>Txn Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItemsCollections.sort((a, b) => b.blockNumber - a.blockNumber).map((e, key) => {
                                        // console.log("e",e.to) 
                                        // if (e.to == null) {
                                        //     // console.log("bharti",e.blockNumber)
                                        //     Web3.eth.getTransactionReceipt(e.hash)
                                        //         .then((data) => {
                                        //             console.log("data", data)
                                        //             if (data.contractAddress) {
                                        //                 setA(data.contractAddress)
                                        //             }

                                        //         })

                                        // }
                                        // if (e.to == null) {
                                        //     // console.log("to null ", e.to, e.hash)
                                        //     Web3.eth.getTransactionReceipt(e.hash)
                                        //         .then((data) => {

                                        if (e.to == null) {

                                            Web3.eth.getTransactionReceipt(e.hash)
                                                .then((e) => {

                                                    setA(a => [e.contractAddress, ...a])
                                                })
                                        }


                                        return (<tr key={key}>
                                            {/* <td>
                                            
                                                    <OverlayTrigger
                                                        trigger="click"
                                                        key="right"
                                                        placement="right"
                                                        overlay={
                                                            <Popover id={`popover-positioned-right`}>
                                                                <Popover.Body>
                                                                    <div className='popover_info_div'>
                                                                        <div className='head'>Additional Info</div>
                                                                        <div className='staus'>
                                                                            <div className='text'>Status</div>
                                                                            <div className='msg'><span><FaCheckCircle /> success</span> (774 block confirmations)</div>
                                                                            <hr></hr>
                                                                            <div className='transaction_action'>Transaction Action:</div>
                                                                            <ul>
                                                                                <li>Register <a href="#">incentbrandogh.eth</a> for 0.016476940741542425 Etheron ENS</li>
                                                                                <li>Expiration Date2027-09-07at13:38UTC</li>
                                                                                <li>Mint of <a href='#'>(ENS)</a> To <a href='#'>0x283af0b28c62c092c9727f1ee09c02ca627eb7f5</a></li>

                                                                            </ul>
                                                                            <div className='view_more'>View more items in Transaction Details.</div>
                                                                            <hr></hr>
                                                                            <div className='transaction_fee'>Transaction Fee:</div>
                                                                            <div className='transaction_fee_no'>0.0027552737864 Ether ($4.17)</div>
                                                                            <hr></hr>
                                                                            <div className='gas_info'>Gas Info:</div>
                                                                            <div className='gas_info_no'>{e.gas} Gas Used From 406,122 Gas Limit @ 0.000000010566361224 Ether (10.566361224 Gwei)</div>
                                                                            <div className='nonce'>Nonce:</div>
                                                                            <div className='nonce_no'>{e.nonce} (in the position 82)</div>
                                                                            <hr></hr>
                                                                            <Link to={``}>See more details </Link>
                                                                        </div>
                                                                    </div>
                                                                </Popover.Body>
                                                            </Popover>
                                                        }
                                                    >
                                                        <Button variant="light"><FaRegEye /></Button>
                                                    </OverlayTrigger>
                                                </td> */}
                                            <td>
                                                {e.hash ?
                                                    <div className='txnHash_address blue'>
                                                        <Link to={`/transaction_details/tx/${e.hash}`}>
                                                            {e.hash.slice(0, 4)}...{e.hash.slice(-4, e.hash.length)}
                                                        </Link>
                                                    </div>
                                                    : <div>-</div>
                                                }

                                            </td>
                                            <td>
                                                {/* {console.log("in JSX =======>",Web3.eth.getTransactionReceipt(e.hash).then((e)=> e.contractAddress))} */}
                                                <div className='method'>{ContractMethodTxt[key] ? ContractMethodTxt[key].slice(0, ContractMethodTxt[key].indexOf("(")) : e.hash.slice(0, 10) ? "transfer" : ""}</div>
                                            </td>
                                            <td>
                                                <div className='block '>
                                                    <Link to={`/block_details/block/${e.blockNumber}`}>
                                                        {e.blockNumber}
                                                    </Link>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='age'>{blockCreatedTime(AllFilteredTimeStamp.sort((a, b) => b - a)[key]).finalValue}</div>
                                            </td>
                                            <td>
                                                {e.from ? <div className='from '>
                                                    <a href={`/address/${e.from}`}>
                                                        {e.from.slice(0, 4)}...{e.from.slice(-4, e.from.length)}
                                                    </a>
                                                </div> : <div>-</div>}
                                            </td>
                                            <td>
                                                <div className='out_icon'>OUT</div>
                                            </td>
                                            <td>



                                                {
                                                    (e.to === null)
                                                        ?
                                                        <div className='ContractAddress_toNull'>
                                                            {ContractAddNull[ContractIndexValue(e.hash) - 1]}
                                                        </div>
                                                        :
                                                        <a href={`/address/${e.to}`}>{e.to.slice(0, 4)}...{e.to.slice(-4, e.to.length)}</a>
                                                }






                                                {/* {e.to !== null ?
                                                    // <div className='to'>
                                                       
                                                    //     <Link to={`/address/${e.to}`}>
                                                    //         {e.to.slice(0, 4)}...{e.to.slice(-4, e.to.length)}
                                                    //     </Link>
                                                    // </div>
                                                    :

                                                    // <div>





                                                       
                                                    //     {
                                                    //         Web3.eth.getTransactionReceipt(e.hash).then((e) => {
                                                    //             return e.contractAddress
                                                    //             setContractAddNull(a => [e.contractAddress, ...a])
                                                    //         })
                                                    //         // getContractAddressForEmptyTo(e.hash)
                                                    //         // ContractAddNull[0]
                                                    //         // console.log("e.hashxxxxxxxxxxxxxxxxx======>", e.hash)
                                                    //         // Web3.eth.getTransactionReceipt(e.hash).then(e=>{
                                                    //         //     console.log("JSX =======>", e.contractAddress);
                                                    //         // })
                                                    //         // if (e.to == null) {
                                                    //         //     console.log("to null ", e.to, e.hash)
                                                    //         //     Web3.eth.getTransactionReceipt(e.hash)
                                                    //         //         .then((data) => {

                                                    //         //             let contractAddress = data.contractAddress
                                                    //         //             setA(contractAddress)
                                                    //         //             console.log("contractAddress", data)
                                                    //         //         })
                                                    //         // }
                                                    //     }
                                                    //     {
                                                    //         // a &&
                                                    //         // 'demo2'
                                                    //         // <Link to={`/address/${a}`}>
                                                    //         //     {a.slice(0, 4)}...{a.slice(-4, a.length)}
                                                    //         // </Link>
                                                    //     }

                                                    // </div>
                                                } */}
                                            </td>
                                            <td>
                                                <div className='value'>{Web3.utils.fromWei(e.value, 'ether')} slice</div>
                                            </td>
                                            <td>
                                                <div className='txn_fees'>{Web3.utils.fromWei((e.gas * e.gasPrice).toString(), 'ether')} <RiMoneyDollarCircleFill /> </div>
                                            </td>
                                        </tr>
                                        )
                                    })}

                                </tbody>
                            </Table>
                            <div className="pagination_div">
                                <div className='show_count'>
                                    <span>show</span>&nbsp;
                                    <select className='selectpagelimt' onChange={(e) => setPageLimit(e.target.value)}>
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
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={2}
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
                        </section>

                // :

                // <section className='no_transaction_section'>
                //     <div className='no_transaction'>
                //         <p>No transactions found</p>
                //     </div>
                // </section>
            }

        </>
    )
}

export default Transactions