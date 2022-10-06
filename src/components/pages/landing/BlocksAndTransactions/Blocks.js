import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Web3 } from '../../../../Web3Provider';
const Blocks = (props) => {
  const darkmode = useSelector((state) => state.theme.darkmode);

  const [latestBlock, setLatestBlock] = useState([])



  useEffect(() => {
    Web3.eth.net.isListening()
      .then((data) => {
        if (data) {
          Web3.eth.getBlockNumber(function (error, result) {
            if (result) {
              for (var i = result; i > result - 10; i--) {
                Web3.eth.getBlock(i)
                  .then((result) => {
                    if (result) {
                      setLatestBlock(oldArray => [result, ...oldArray]);
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
    } else if (hourAgo >= 24 && days <= 31 ) {
      finalValue = `${days} day ago`
    }else if(days > 30 &&  month <= 12){
      finalValue = `${month} month ago`
    }else if(month > 12){
      finalValue = `${year} year ago`
    }
    return (
      { finalValue }
    );
  }


  return (
    <>

      {latestBlock.length > 0 ?
        <section className={`blocks_wrap ${!darkmode ? "" : "dark_mode"}`}>
          <div className="blocks_title">
            <h6 className='h6_title'>Latest Blocks</h6>
          </div>

          <div className="blocks_user_wrap">
            {latestBlock.sort((a, b) => b.number - a.number).map((e, index) => {
              return (<Row key={index}>
                <Col sm={4} md={4} lg={4} xl={4}>
                  <div className='block_user'>
                    <span className='block_user_profile '>BK</span>
                    <div className='user_id'>
                      <Link to={`/block_details/block/${e.number}`}>{e.number}</Link>
                      <p>{blockCreatedTime(e.timestamp).finalValue}</p>
                    </div>
                  </div>
                </Col>
                <Col sm={8} md={8} lg={8} xl={8}>
                  <div className='block_id_wrap'>
                    <div className='validated_id'>
                      <Link to={`/block_details/block/${e.number}`}>{e.hash.slice(0, 4)}....{e.hash.slice(-4, e.hash.length)}</Link>
                      <div className='validated_time'>
                        <span>{blockCreatedTime(e.timestamp).finalValue}</span>
                      </div>
                    </div>
                    <div className='validated_id'>
                      {e.transactions.length} <p>Transactions</p>
                      <div className='validated_time'>
                        <span>txn {blockCreatedTime(e.timestamp).finalValue}</span>
                      </div>
                    </div>
                  </div>
                </Col>
                <hr />
              </Row>
              )
            })}

          </div>
          <div className='blocks_footer'>
            <Link to="/block" className='primary_btn'>View all blocks</Link>
          </div>
        </section>
        :
        <section className={`blocks_wrap ${!darkmode ? "" : "dark_mode"}`}>
          <div className="blocks_title">
            <h6 className='h6_title'>Latest Blocks</h6>
          </div>

          <div className='blocks_loader'>
            <Spinner animation="border" variant="primary" size="sm" />
          </div>

          <div className='blocks_footer'>
            <Link to="/block" className='primary_btn'>View all blocks</Link>
          </div>
        </section>
      }
    </>
  )
}

export default Blocks