import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery'
import { useEffect } from 'react';
var BASE_URL = process.env.REACT_APP_BASE_URL

const SignIn = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameErr, setUsernameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [loader, setLoader] = useState(false)
    // ========captch fuction start=========
    let captcha = "6Lf3IIghAAAAAI6aMGCoCyq360MYicArZ03BGNPL"

    function onChange(value) {
        console.log("Captcha value:", value);
    }
    
    // ========captch fuction end=========
    useEffect(()=>{
        $("#emptyNameErr").hide();
        $("#emptyPwdErr").hide();
    })

    $(".validate").focus(function () {
        $("#emptyNameErr").hide();
        $("#emptyPwdErr").hide();
        setUsernameErr("")
        setPasswordErr("")
    })
   

    // ========sign in fuction start=========
    const handleSignIn = async () => {
        setLoader(true)
        const data = { username: username, password: password }

       
        if(username == ""){
            $("#emptyNameErr").show();
            setLoader(false)
        }

        if(password == ""){
            $("#emptyPwdErr").show();
            setLoader(false)
        }
       

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        await axios.post(`${BASE_URL}/login`, data, config)
            .then((res) => {
                console.log("res", res)
                if (res.status === 200) {
                    setLoader(false)
                    toast.success('You have Sign In Successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        theme: "colored",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    localStorage.setItem('user', JSON.stringify(res.data.result));
                    localStorage.setItem('accessToken', `Bearer ${res.data.result.accessToken}`);
                    console.log("localStorage data", res.data.result.accessToken)
                    setTimeout(() => {
                        navigate('/')
                    }, 3000)

                }

            }).catch((err) => {
                // if (err.response.data.status === 422) {
                //     setUsernameErr(err.response.data.message.username)
                //     setPasswordErr(err.response.data.message.password)
                //     setLoader(false)
                // }
                if (err.response.data.status === 401) {
                    toast.error(`${err.response.data.message}`, {
                        position: "top-center",
                        autoClose: 5000,
                        theme: "colored",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setLoader(false)
                }
            })


    }
    // ========sign in fuction end=========

    return (
        <>
            <section className='signIn_wrap'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6} md={7} sm={12}>
                            <div className='signIn_title'>
                                <h2 className='h2_title'>Welcome back</h2>
                                <p>Login to your account</p>
                            </div>
                            <div className='signIn_form'>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Username / Email</Form.Label>
                                        <Form.Control type="text" placeholder="Username / Email" className='input_field validate' value={username} onChange={(e) => setUsername(e.target.value)} />
                                        <p className='error_msg' id="emptyNameErr">Username / Email is required.</p>
                                        <p className='error_msg' id='usernameErr'>{usernameErr}</p>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" className='input_field validate' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <p className='error_msg' id="emptyPwdErr">Password is required.</p>
                                        <p className='error_msg' id='passwordErr'>{passwordErr}</p>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <div className='d-flex justify-content-between'>
                                            <Form.Check type="checkbox" label="Check me out" className='input_field' />
                                            <Link to="/forgotPassword" style={{ textDecoration: "underline" }}>Forgot your password?</Link>
                                        </div>
                                    </Form.Group>
                                    <div className='captcha_wrap'>
                                        <ReCAPTCHA
                                            sitekey={captcha}
                                            onChange={onChange}
                                            className="captcha"
                                        />
                                    </div>
                                    <div className='logIn_option'>
                                        <p>Don't have an account?<Link to="/signUp">Click to sign up</Link></p>
                                        <Button variant="primary" className='primary_btn' onClick={handleSignIn}>
                                            {loader ? <Spinner animation="border" variant="light" size="sm" /> : "Submit "}
                                        </Button>
                                    </div>
                                </Form>
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

export default SignIn
