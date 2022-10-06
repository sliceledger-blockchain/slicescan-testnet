import React from 'react'
import {Table} from 'react-bootstrap'
import {FaRegEye, FaAngleRight, FaAngleLeft} from 'react-icons/fa'
import {AiOutlineFileText} from 'react-icons/ai'
import {RiMoneyDollarCircleFill} from 'react-icons/ri'
import {Link} from 'react-router-dom'
function TransactionTable() {
  return (
    <>
    <section className='transaction_table_section'>
        <div className='ps-3 mb-3'> Latest 25 from a total of 77 transactions</div>
        <Table responsive  hover>
            <thead>
                <tr>
                    <th></th>
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
                <tr>
                    <td>
                        <div className="view_icon"><FaRegEye/></div>
                    </td>
                    <td>
                        <div className='txnHash_address blue'><Link to="/transaction_details">0x52cb02756720498865...</Link></div>
                    </td>
                    <td>
                        <div className='method'>Execute sale721</div>
                    </td>
                    <td>
                        <div className='block blue'>11285795</div>
                    </td>
                    <td>
                        <div className='age'>24 mins ago</div>
                    </td>
                    <td>
                        <div className='from blue'>0xbd144b9612396a7f52e...</div>
                    </td>
                    <td>
                        <div className='in_icon'>IN</div>
                    </td>
                    <td>
                        <div className='to'><AiOutlineFileText/> 0xcef5e6370205fd84973a...</div>
                    </td>
                    <td>
                        <div className='value'>0 Ether</div>
                    </td>
                    <td>
                        <div className='txn_fees'>0.000311 <RiMoneyDollarCircleFill/> </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="view_icon"><FaRegEye/></div>
                    </td>
                    <td>
                        <div className='txnHash_address blue'><Link to="/transaction_details">0x52cb02756720498865...</Link></div>
                    </td>
                    <td>
                        <div className='method'>Execute sale721</div>
                    </td>
                    <td>
                        <div className='block blue'>11285795</div>
                    </td>
                    <td>
                        <div className='age'>24 mins ago</div>
                    </td>
                    <td>
                        <div className='from blue'>0xbd144b9612396a7f52e...</div>
                    </td>
                    <td>
                        <div className='in_icon'>IN</div>
                    </td>
                    <td>
                        <div className='to'><AiOutlineFileText/> 0xcef5e6370205fd84973a...</div>
                    </td>
                    <td>
                        <div className='value'>0 Ether</div>
                    </td>
                    <td>
                        <div className='txn_fees'>0.000311 <RiMoneyDollarCircleFill/> </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="view_icon"><FaRegEye/></div>
                    </td>
                    <td>
                        <div className='txnHash_address blue'><Link to="/transaction_details">0x52cb02756720498865...</Link></div>
                    </td>
                    <td>
                        <div className='method'>Execute sale721</div>
                    </td>
                    <td>
                        <div className='block blue'>11285795</div>
                    </td>
                    <td>
                        <div className='age'>1 hr 46 mins ago</div>
                    </td>
                    <td>
                        <div className='from blue'>0xbd144b9612396a7f52e...</div>
                    </td>
                    <td>
                        <div className='in_icon'>IN</div>
                    </td>
                    <td>
                        <div className='to'><AiOutlineFileText/> 0xcef5e6370205fd84973a...</div>
                    </td>
                    <td>
                        <div className='value'>0 Ether</div>
                    </td>
                    <td>
                        <div className='txn_fees'>0.000311 <RiMoneyDollarCircleFill/> </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="view_icon"><FaRegEye/></div>
                    </td>
                    <td>
                        <div className='txnHash_address blue'><Link to="/transaction_details">0x52cb02756720498865...</Link></div>
                    </td>
                    <td>
                        <div className='method'>Execute sale721</div>
                    </td>
                    <td>
                        <div className='block blue'>11285795</div>
                    </td>
                    <td>
                        <div className='age'>2 hr 50 mins ago</div>
                    </td>
                    <td>
                        <div className='from blue'>0xbd144b9612396a7f52e...</div>
                    </td>
                    <td>
                        <div className='in_icon'>IN</div>
                    </td>
                    <td>
                        <div className='to'><AiOutlineFileText/> 0xcef5e6370205fd84973a...</div>
                    </td>
                    <td>
                        <div className='value'>0 Ether</div>
                    </td>
                    <td>
                        <div className='txn_fees'>0.000311 <RiMoneyDollarCircleFill/> </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="view_icon"><FaRegEye/></div>
                    </td>
                    <td>
                        <div className='txnHash_address blue'><Link to="/transaction_details">0x52cb02756720498865...</Link></div>
                    </td>
                    <td>
                        <div className='method'>Execute sale721</div>
                    </td>
                    <td>
                        <div className='block blue'>11285795</div>
                    </td>
                    <td>
                        <div className='age'>50 mins ago</div>
                    </td>
                    <td>
                        <div className='from blue'>0xbd144b9612396a7f52e...</div>
                    </td>
                    <td>
                        <div className='in_icon'>IN</div>
                    </td>
                    <td>
                        <div className='to'><AiOutlineFileText/><Link to="/transaction_details">0x52cb02756720498865...</Link></div>
                    </td>
                    <td>
                        <div className='value'>0 Ether</div>
                    </td>
                    <td>
                        <div className='txn_fees'>0.000311 <RiMoneyDollarCircleFill/> </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="view_icon"><FaRegEye/></div>
                    </td>
                    <td>
                        <div className='txnHash_address blue'><Link to="/transaction_details">0x52cb02756720498865...</Link></div>
                    </td>
                    <td>
                        <div className='method'>Execute sale721</div>
                    </td>
                    <td>
                        <div className='block blue'>11285795</div>
                    </td>
                    <td>
                        <div className='age'>2 days 18 hrs ago</div>
                    </td>
                    <td>
                        <div className='from blue'>0xbd144b9612396a7f52e...</div>
                    </td>
                    <td>
                        <div className='in_icon'>IN</div>
                    </td>
                    <td>
                        <div className='to'><AiOutlineFileText/> 0xcef5e6370205fd84973a...</div>
                    </td>
                    <td>
                        <div className='value'>0 Ether</div>
                    </td>
                    <td>
                        <div className='txn_fees'>0.000311 <RiMoneyDollarCircleFill/> </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="view_icon"><FaRegEye/></div>
                    </td>
                    <td>
                        <div className='txnHash_address blue'><Link to="/transaction_details">0x52cb02756720498865...</Link></div>
                    </td>
                    <td>
                        <div className='method'>Execute sale721</div>
                    </td>
                    <td>
                        <div className='block blue'>11285795</div>
                    </td>
                    <td>
                        <div className='age'>47 mins ago</div>
                    </td>
                    <td>
                        <div className='from blue'>0xbd144b9612396a7f52e...</div>
                    </td>
                    <td>
                        <div className='in_icon'>IN</div>
                    </td>
                    <td>
                        <div className='to'><AiOutlineFileText/> 0xcef5e6370205fd84973a...</div>
                    </td>
                    <td>
                        <div className='value'>0 Ether</div>
                    </td>
                    <td>
                        <div className='txn_fees'>0.000311 <RiMoneyDollarCircleFill/> </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="view_icon"><FaRegEye/></div>
                    </td>
                    <td>
                        <div className='txnHash_address blue'><Link to="/transaction_details">0x52cb02756720498865...</Link></div>
                    </td>
                    <td>
                        <div className='method'>Execute sale721</div>
                    </td>
                    <td>
                        <div className='block blue'>11285795</div>
                    </td>
                    <td>
                        <div className='age'>2 days 18 hrs ago</div>
                    </td>
                    <td>
                        <div className='from blue'>0xbd144b9612396a7f52e...</div>
                    </td>
                    <td>
                        <div className='in_icon'>IN</div>
                    </td>
                    <td>
                        <div className='to'><AiOutlineFileText/> 0xcef5e6370205fd84973a...</div>
                    </td>
                    <td>
                        <div className='value'>0 Ether</div>
                    </td>
                    <td>
                        <div className='txn_fees'>0.000311 <RiMoneyDollarCircleFill/> </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="view_icon"><FaRegEye/></div>
                    </td>
                    <td>
                        <div className='txnHash_address blue'><Link to="/transaction_details">0x52cb02756720498865...</Link></div>
                    </td>
                    <td>
                        <div className='method'>Execute sale721</div>
                    </td>
                    <td>
                        <div className='block blue'>11285795</div>
                    </td>
                    <td>
                        <div className='age'>24 mins ago</div>
                    </td>
                    <td>
                        <div className='from blue'>0xbd144b9612396a7f52e...</div>
                    </td>
                    <td>
                        <div className='in_icon'>IN</div>
                    </td>
                    <td>
                        <div className='to'><AiOutlineFileText/> 0xcef5e6370205fd84973a...</div>
                    </td>
                    <td>
                        <div className='value'>0 Ether</div>
                    </td>
                    <td>
                        <div className='txn_fees'>0.000311 <RiMoneyDollarCircleFill/> </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="view_icon"><FaRegEye/></div>
                    </td>
                    <td>
                        <div className='txnHash_address blue'><Link to="/transaction_details">0x52cb02756720498865...</Link></div>
                    </td>
                    <td>
                        <div className='method'>Execute sale721</div>
                    </td>
                    <td>
                        <div className='block blue'>11285795</div>
                    </td>
                    <td>
                        <div className='age'>2 days 18 hrs ago</div>
                    </td>
                    <td>
                        <div className='from blue'>0xbd144b9612396a7f52e...</div>
                    </td>
                    <td>
                        <div className='in_icon'>IN</div>
                    </td>
                    <td>
                        <div className='to'><AiOutlineFileText/> 0xcef5e6370205fd84973a...</div>
                    </td>
                    <td>
                        <div className='value'>0 Ether</div>
                    </td>
                    <td>
                        <div className='txn_fees'>0.000311 <RiMoneyDollarCircleFill/> </div>
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
                <span><FaAngleLeft/></span>&nbsp;&nbsp;
                <span>1 of 200</span>&nbsp;&nbsp;
                <span><FaAngleRight/></span>&nbsp;&nbsp;
                <span>Last</span>
            </div>
        </div>
    </section>
    </>
  )
}

export default TransactionTable