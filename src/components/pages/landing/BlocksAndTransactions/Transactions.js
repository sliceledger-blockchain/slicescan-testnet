import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { Web3 } from '../../../../Web3Provider';

const Transactions = () => {
  const darkmode = useSelector((state) => state.theme.darkmode);
  const [latestTransactions, setLatestTransactions] = useState([])
  const [transactionsTime, setTransactionsTime] = useState([])


  useEffect(() => {
    Web3.eth.net.isListening()
      .then((data) => {
        if (data) {
          Web3.eth.getBlockNumber(function (error, result) {
            const currentBlockNumber = result;
            const StartBlockNumber = result - 10
            //  console.log("currentBlockNumber", currentBlockNumber);
            // console.log("StartBlockNumber", StartBlockNumber);
            if (result) {
              for (var i = StartBlockNumber; i <= currentBlockNumber; i++) {
                Web3.eth.getBlock(i)
                  .then((result) => {
                    // console.log("getBlock(i)", result);

                    if (result) {
                      if (result.transactions) {
                        if (result.transactions.length > 0) {
                        
                          const lastTranasctions = result.transactions.slice(-1)

                          Web3.eth.getTransaction(lastTranasctions[0]).then(
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

  const [a, setA] = useState("")

 return (
    <>
      {latestTransactions.length > 0 ?

        <section className={`transactions_wrap ${!darkmode ? "" : "dark_mode"}`} >
          <div className='transactions_title'>
            <h6 className='h6_title'>Latest Transactions</h6>
          </div>
          <div className='transactions_user_wrap'>

            {latestTransactions.sort((a, b) => b.blockNumber - a.blockNumber).slice(0, 10).map((e, index) => {
              if (e.to == null) {
              
                Web3.eth.getTransactionReceipt(e.hash)
                  .then((data) => {

                    let contractAddress = data.contractAddress
                    setA(contractAddress)
                   
                  })
              }

              return (
                <Row key={index}>
                  <Col sm={5} md={5} lg={5} xl={5}>
                    <div className='transactions_user'>
                      <span className='transactions_user_profile '>TX</span>
                      <div className='user_id'>
                        <Link to={`/transaction_details/tx/${e.hash}`}>{e.hash.slice(0, 4)}....{e.hash.slice(-4, e.hash.length)} </Link>

                        <p>{blockCreatedTime(transactionsTime.sort((a, b) => b - a)[index]).finalValue}</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={7} md={7} lg={7} xl={7}>
                    <div className='transactions_id_wrap'>
                      <div className='transactions_id'>
                        <p>From</p>
                        {e.from ? <Link to={`/address/${e.from}`}>{e.from.slice(0, 4)}...{e.from.slice(-4, e.from.length)}</Link> : <span>-</span>}
                        <div className='transactions_time'>
                          <p>To </p>
                          {(e.to !== null) ?
                            <Link to={`/address/${e.to}`}>{e.to.slice(0, 4)}...{e.to.slice(-4, e.to.length)}</Link>
                            :
                            <span>
                              {
                                a &&
                                <Link to={`/address/${a}`}>
                                  {a.slice(0, 4)}...{a.slice(-4, a.length)}
                                </Link>
                              }
                            </span>
                          }
                        </div>
                      </div>
                      <div className='slice'>
                        <p>{Web3.utils.fromWei(e.value.toString(), 'ether')}SLICE</p>
                      </div>
                    </div>
                  </Col>
                  <hr />
                </Row>
              )
            })}
          </div>
          <div className='transactions_footer'>
            <Link to="/alltransaction" className='primary_btn'>View all Transactions</Link>
          </div>
        </section>
        :
        <section className={`transactions_wrap ${!darkmode ? "" : "dark_mode"}`}>
          <div className="transactions_title">
            <h6 className='h6_title'>Latest Transactions </h6>
          </div>
          <div className='transactions_loader'>
            <Spinner animation="border" variant="primary" size="sm" />
          </div>
          <div className='transactions_footer'>
            <Link to="/alltransaction" className='primary_btn'>View all Transactions</Link>
          </div>
        </section>

      }
    </>
  )
}

export default Transactions