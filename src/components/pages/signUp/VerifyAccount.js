import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {HiOutlineMail} from 'react-icons/hi'
function VerifyAccount() {
  return (
    <>
      <section className='verify_account_wrap'>
        <Container>
            <Row className="justify-content-center">
                <Col lg={6}>
                    <div className='verify_account_content'>
                        <div className='verify_account_head'>Register a New Account</div>
                        <div className='verify_account_note'>Your account registration has been submitted and is pending email verification. <HiOutlineMail/></div>
                        <div className='verify_account_text'>
                            <p>We have sent an email to priyanka.infograins@gmail.com with a link to activate ypur account. To complete the  sign-up process, please click on the confirmation link in the email.</p>
                            <p>If you do not receive a confirmation email, please check your spam folder and ensure your spam filters allow emails from  noreply@slicescan.io</p>
                            <p>If you need any assistance, please <a href='#'>contact us</a></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default VerifyAccount