import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {FaRegUserCircle} from 'react-icons/fa'
import {MdOutlineMail} from 'react-icons/md'
import {GrEdit} from 'react-icons/gr'
function MyProfile() {
  return (
    <>
        <section className='myprofile_wrap'>
            <div className='hero_bg'></div>
            <div className='myprofile_content'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={8}>
                            <div className='myprofile_div'>
                                <div className='head'>Personal Info</div>
                                <hr></hr>
                                <div className='subhead'>Below are the username, email and overview information for your account.</div>
                                <div className='personal_info'>
                                    <Row>
                                        <Col lg={5}>
                                            <div className='username'><FaRegUserCircle /> Your username:</div>
                                        </Col>
                                        <Col lg={7}>
                                            <div className='username_text'> priyanka</div>
                                        </Col>
                                    </Row>
                                    <hr style={{margin: "0.4rem 0"}}></hr>
                                    <Row>
                                        <Col lg={5}>
                                            <div className='username'><MdOutlineMail /> Your Email Address:</div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='username_text'> priyanka.infograins@gmail.com</div>
                                        </Col>
                                        <Col lg={1}>
                                            <div className='edit_btn'><GrEdit/> Edit</div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    </>
  )
}

export default MyProfile