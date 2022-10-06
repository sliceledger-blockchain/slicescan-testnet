import React, {useState, useEffect} from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import {Link, useSearchParams} from 'react-router-dom'
import axios from 'axios';
var BASE_URL = process.env.REACT_APP_BASE_URL
function ConfirmEmail() {
    // let pathUrl = useLocation()
    // let splitUrl = pathUrl.pathname.split("=")
    // let sliceData = splitUrl[1].slice(0,-6)
    const [searchParams, setSearchParams] = useSearchParams()
    console.log("pathUrl", searchParams.get("email"))
    let email = searchParams.get("email")
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(true)

    
    const getData = async()=>{
        await axios.post(`${BASE_URL}/verifyEmailAccount`, {email:email})
        .then((res)=>{
            setLoading(false)
            console.log("res", res)
            if(res.data.status === 200){
                setMsg(res.data.message)   
            }
            
        })
        .catch((err)=>{
            setLoading(false)
            console.log("confirm err", err)
            if(err.response.data.status === 401){
                setMsg(err.response.data.message)  
            }
            
        })
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <>
        <section className='confirm_email_wrap'>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6}>
                        {loading ? 
                            <h6 className='py-5 text-center'>Loading.......</h6>
                        :
                        <div className='confirm_email_content'>
                            <div className='confirm_email_head'>Confirm Your <strong>Email</strong> </div>
                            <div className='confirm_email_note'>
                                <h6>{msg}</h6>
                                
                            </div>
                            <div className='confirm_email_btn'>
                            <Link to="/signIn" className='primary_btn'>Click to Login</Link>
                            </div>
                        </div>
}
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default ConfirmEmail