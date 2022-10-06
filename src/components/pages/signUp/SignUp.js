import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'
import { useNavigate } from 'react-router-dom';
var BASE_URL = process.env.REACT_APP_BASE_URL

const SignUp = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkValue, setCheckValue] = useState(false)

    const [usernameErr, setUsernameErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [loader, setLoader] = useState(false)
    // ========captch fuction start=========
    let captcha = "6Lf3IIghAAAAAI6aMGCoCyq360MYicArZ03BGNPL"
    function onChange(value) {
        console.log("Captcha value:", value);
    }
    // ========captch fuction end=========
    useEffect(() => {
        $("#usernameErr").hide();
        $("#usernameErrAlpha").hide();
        $("#usernameLengthErr").hide();
        $("#emailErr").hide();
        $("#validEmailErr").hide();
        $("#passwordErr").hide();
        $("#passwordLengthErr").hide();
        $("#confirmPasswordErr").hide();
        $("#confirmPasswordMatchErr").hide();
        $("#checkboxdErr").hide();

    })

    $(".validate").focus(function () {
        setUsernameErr("")
        setEmailErr("")
        $("#usernameErr").hide();
        $("#usernameLengthErr").hide();
        $("#emailErr").hide();
        $("#validEmailErr").hide();
        $("#passwordErr").hide();
        $("#confirmPasswordErr").hide();
        $("#checkboxdErr").hide();
    })

    async function checkNameValidation() {
        let newNameData = { "username": username }
        var checkNameData = await axios.post(`${BASE_URL}/checkUserName`, newNameData)

        if (checkNameData.data.status === 200) {
            setUsernameErr(checkNameData.data.message)

        }
        else {
            setUsernameErr("")
        }
    }

    async function checkEmailValidation() {
        let newEmailData = { "email": email }
        var checkEmailData = await axios.post(`${BASE_URL}/checkEmailId`, newEmailData)

        if (checkEmailData.data.status === 200) {
            setEmailErr(checkEmailData.data.message)

        }
        else {
            setEmailErr("")
        }
    }

    // ========sign up fuction start=========
    const handleSignUp = async () => {
        setLoader(true)
        var letters = /^[0-9a-zA-Z]+$/;
        const emailRegEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        const data = { username: username, email: email, password: password, confirm_password: confirmPassword }

        if (username == "") {
            $("#usernameErr").show();
            setLoader(false)
        } else if (username.length < 5) {
            $("#usernameLengthErr").show();

        } else if (!letters.test(username)) {
            $("#usernameErrAlpha").show();
            return
        }

        if (email == "") {
            $("#emailErr").show();
            setLoader(false)
        } else if (!emailRegEx.test(email)) {
            $("#validEmailErr").show();
            return
        }

        if (password == "") {
            $("#passwordErr").show();
            setLoader(false)
        } else if (password.length < 5) {
            $("#passwordLengthErr").show();
            return
        }

        if (confirmPassword == "") {
            $("#confirmPasswordErr").show();
            setLoader(false)
            return
        } else if (password !== confirmPassword) {
            $("#confirmPasswordMatchErr").show();
            return
        }
        if (checkValue == false) {
            $("#checkboxdErr").show();
            setLoader(false)
            return
        }






        axios.post(`${BASE_URL}/signUp`, data)
            .then((res) => {
                console.log("res", res.data.message)
                if (res.status === 200) {
                    setLoader(false)
                    toast.success('You have Sign Up Successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        theme: "colored",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        navigate('/verify_account')
                    }, 3000)
                }


            }).catch((err) => {
                console.log("error", err.response.data.message)
            })

    }
    // ========sign up fuction end=========


    return (
        <>
            <section className='signUp_wrap'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6} md={7} sm={12}>
                            <div className='signUp_title'>
                                <h2 className='h2_title'>Register a New Account</h2>
                                <p>Fill out the form to get started.</p>
                            </div>
                            <div className='signUp_form'>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Username" className='input_field validate' value={username} onChange={(e) => setUsername(e.target.value)} onKeyUp={checkNameValidation} />
                                        <p className='error_msg' id='usernameErr'> Username field is required.</p>
                                        <p className='error_msg' id='usernameErrAlpha'> Username allow only characters and numbers.</p>
                                        <p className='error_msg' id='usernameLengthErr'>The username must be at least 5 characters.</p>
                                        <p className='error_msg' id='sameUserNameErr'>{usernameErr}</p>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" className='validate' placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} onKeyUp={checkEmailValidation} />
                                        <p className='error_msg' id='emailErr'>Email field is required.</p>
                                        <p className='error_msg' id="validEmailErr">Enter valid email</p>
                                        <p className='error_msg' id='sameEmailErr'>{emailErr}</p>
                                    </Form.Group>
                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" className='validate' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <p className='error_msg' id='passwordErr'>Password field is required.</p>
                                                <p className='error_msg' id='passwordLengthErr'>The password must be at least 6 characters.</p>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" className='validate' placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                <p className='error_msg' id='confirmPasswordErr'>Confirm Password field is required.</p>
                                                <p className='error_msg' id='confirmPasswordMatchErr'>The confirm password and password must be same.</p>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="d-flex ms-4" controlId="formBasicCheckbox" style={{ gap: "8px" }}>
                                        <Form.Check type="checkbox" id='check_box' onChange={(e) => setCheckValue(e.target.checked)} />
                                        <span>I agree to the Terms and Conditions</span>
                                    </Form.Group>
                                    <p className='error_msg ' id='checkboxdErr'>Please accept our terms and conditions</p>

                                    <Form.Group className="mb-3 d-flex ms-4" controlId="formBasicCheckbox" style={{ gap: "8px" }}>
                                        <Form.Check type="checkbox" className='input_field' />
                                        <span>I agree to receive the Slice newsletter and understand that I can unsubscribe at any time.</span>
                                    </Form.Group>

                                    <div className='captcha_wrap '>
                                        <ReCAPTCHA
                                            sitekey={captcha}
                                            onChange={onChange}
                                            className="captcha"
                                        />
                                    </div>
                                    <div className='logIn_option'>
                                        <p>Already have an account?<Link to="/signIn">Click to sign in</Link></p>
                                        <Button variant="primary" className='primary_btn' onClick={handleSignUp}>
                                            {loader ? <Spinner animation="border" variant="light" size="sm" /> : "Create an account "}
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

export default SignUp