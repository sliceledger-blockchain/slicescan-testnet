import axios from 'axios';
import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom'
import $ from 'jquery'
var BASE_URL = process.env.REACT_APP_BASE_URL

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [emailErr, setEmailErr] = useState("")

    // ========captch fuction start=========
    let captcha = "6Lf3IIghAAAAAI6aMGCoCyq360MYicArZ03BGNPL"
    function onChange(value) {
        console.log("Captcha value:", value);
        // ========captch fuction end=========
    }
    $(".validate").focus(function(){
        setEmailErr("")
    })
    const handlePassword = async()=>{
        await axios.post(`${BASE_URL}/forgetPassword`, {email:email})
        .then((res)=>{
            console.log("res", res)
            if(res.data.status === 200){
                document.getElementById("success_note").style.display = "block"
            }
        })
        .catch((err)=>{
            console.log("err", err.response.data.message)
            if(err.response.data.status === 422){
                setEmailErr(err.response.data.message.email)
            }
            if(err.response.data.status === 401){
                setEmailErr(err.response.data.message)
            }
        })
    }
    return (
        <>
            <section className='forgotPwd_wrap'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6} md={7}>
                            <div className='forgotPwd_form'>
                                <div className='forgot_head'>Forgot your password?</div>
                                <div className='forgot_subhead'>Enter your email address below and we'll get you back on track.</div>
                                <div className='forgot_success_note' id="success_note">
                                    <div className='success_head'>You've successfully requested a forgot password.</div>
                                    <div className='success_subhead'>If the email address belongs to a known account, a recovery password will be sent to you within the next few minutes.</div>
                                    <ul>
                                        <li>If you have yet to receive the "Password Recovery" email, please check your spam/junk email folders.</li>
                                        <li>Or you may request for a new password reset after 15 minutes.</li>
                                    </ul>
                                </div>
                                <Form.Group className='email_address mt-4'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="text" placeholder='Email Addrss' value={email} onChange={(e) => setEmail(e.target.value)} className="validate" />
                                    <p className='error_msg' id='passwordErr'>{emailErr}</p>
                                </Form.Group>

                                <div className='captcha_wrap'>
                                    <ReCAPTCHA
                                        sitekey={captcha}
                                        onChange={onChange}
                                        className="captcha"
                                    />
                                </div>
                                <div className='reset_pwd_btn'>
                                    <Form.Text className="text-muted forgot_pass">
                                        <Link to="/signIn">Back to sign in</Link>
                                    </Form.Text>
                                    <button className='primary_btn' onClick={handlePassword}>Reset Password</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ForgotPassword