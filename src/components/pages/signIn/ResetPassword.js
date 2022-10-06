import axios from 'axios'
import React, {useState} from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useSearchParams, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var BASE_URL = process.env.REACT_APP_BASE_URL

function ResetPassword() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    console.log("pathUrl", searchParams.get("email"))
    let email = searchParams.get("email")
   
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [confirmPasswordErr, setConfirmPasswordErr] = useState("")

    $(".validate").focus(function(){
        setPasswordErr("")
        setConfirmPasswordErr("")
    })

    const handleResetPwd = async ()=>{
        await axios.post(`${BASE_URL}/resetpassword`, {new_password:password, confirm_password:confirmPassword, email:email})
        .then((res)=>{
            console.log("res", res)
            if(res.status === 200){
                toast.success('Your Password Reset Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    theme:"colored",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    setTimeout(()=>{
                        navigate('/signIn')
                    }, 3000)
            }
        })
        .catch((err)=>{
            console.log("err", err.response.data.message)
            if(err.response.status === 422){
                setPasswordErr(err.response.data.message.new_password)
                setConfirmPasswordErr(err.response.data.message.confirm_password)
            }
        })
    }

    return (
        <>
            <section className='reset_password_wrap'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6} md={7}>
                            <div className='resetPwd_form'>
                                <div className='reset_head'>Reset Password</div>
                                <div className='reset_subhead'>Enter a new password below to reset your password.</div>

                                <Form.Group className='password_input mt-4'>
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="text" placeholder='Email Addrss' value={password} onChange={(e) => setPassword(e.target.value)} className="validate" />
                                    <p className='error_msg' id='passwordErr'>{passwordErr}</p>
                                </Form.Group>

                                <Form.Group className='password_input mt-4'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="text" placeholder='Email Addrss' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="validate" />
                                    <p className='error_msg' id='passwordErr'>{confirmPasswordErr}</p>
                                </Form.Group>

                                <div className='reset_pwd_btn'>
                                    <button className='primary_btn' onClick={handleResetPwd}>Submit</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default ResetPassword