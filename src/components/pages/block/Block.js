
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Spinner} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { Web3 } from '../../../Web3Provider';
import Hero from '../landing/Hero';



const Block = () => {
    const [pageLimit, setPageLimit] = useState(11);
    const [allBlock, setLatestBlock] = useState([]);
    const [showPage, setShowPage] = useState(false);



    useEffect(() => {
console.log("demno");


        Web3.eth.net.isListening()
            .then((data) => {
                if (data) {
                    Web3.eth.getBlockNumber(function (error, result) {
                        console.log("result", result);
                        if (result) {
                            setShowPage(result)
                            for (var i = result; i >= 0; i--) {
                                Web3.eth.getBlock(i)
                                    .then((result) => {
                                        if (result) {
                                            setLatestBlock(oldArray => [...oldArray, result]);
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
        if (allBlock) {
            const endOffsetCollections = itemOffsetCollections + itemsPerPageCollections;
            setCurrentItemsCollections(allBlock.slice(itemOffsetCollections, endOffsetCollections));
            setPageCountCollections(Math.ceil(allBlock.length / itemsPerPageCollections));
        } else {
        }
    }, [allBlock, itemOffsetCollections, itemsPerPageCollections]);

    const handlePageClickCollections = (event) => {
        const newOffsetCollections =
            (event.selected * itemsPerPageCollections) % allBlock.length;
        setItemOffsetCollections(newOffsetCollections);
    };
    // =============all Collections pagination end===============



    return (
        <>

            <section className='innerHeroSection'> <Hero /></section>

            {currentItemsCollections.length ?
                <section className='block_details py-3'>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className='block_head'>Blocks</div>
                                <hr />
                                <div className='block_table'>
                                    <Table responsive hover>
                                        <thead>
                                            <tr className='table_headings'>

                                                <th>Height</th>
                                                <th>Age</th>
                                                <th>Size</th>
                                                <th>Total Transactions</th>
                                                <th>Rewards</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {currentItemsCollections.sort((a, b) => b.number - a.number).map((e, index) => {

                                                return (<tr key={index}>
                                                    <td>
                                                        <div><Link to={`/block_details/block/${e.number}`} className='transaction_details'>{e.number}</Link></div>
                                                    </td>
                                                    <td>
                                                        <div>{blockCreatedTime(e.timestamp).finalValue}</div>
                                                    </td>
                                                    <td>
                                                        <div>{e.size} bytes</div>
                                                    </td>
                                                    <td>
                                                        <div>{e.transactions.length}</div>
                                                    </td>
                                                    <td>
                                                        <div>0 SLICE</div>
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

                                            {showPage + 1 === allBlock.length ?
                                                <ReactPaginate
                                                    breakLabel="..."
                                                    nextLabel=" next"
                                                    onPageChange={handlePageClickCollections}
                                                    pageRangeDisplayed={1}
                                                    marginPagesDisplayed={1}
                                                    pageCount={pageCountCollections}
                                                    previousLabel="prev "
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
                                                :
                                                <>
                                                   
                                                   <div class="dots-4"></div>
                                              
                                                </>
                                            }



                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                :
                <>
                    <section className='block_details py-3'>
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className='block_head'>Blocks</div>
                                    <hr />
                                    <div className='block_table_loading'>
                                        <Spinner animation="border" variant="primary" size="sm" />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </>
            }
            
        </>
    )
}

export default Block