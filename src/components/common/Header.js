import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { FaRegUserCircle, FaAngleDown } from 'react-icons/fa';
import logo from '../../asset/image/logo.png';
import slice from '../../asset/image/logo.png';
import { Link, useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios';
var BASE_URL = process.env.REACT_APP_BASE_URL

export default function Header() {
    const navigate = useNavigate()

    const loggedUser = JSON.parse(localStorage.getItem("user"))
    const accessToken = localStorage.getItem("accessToken")
    const [headerShow, setHeaderShow] = useState(true)



    const config = {
        headers: {
            "Content-type": "application/json",
            "accept": "application/json",
            Authorization: accessToken
        },
    };

    const handleLogout = () => {

        axios.get(`${BASE_URL}/logout`, config)
            .then((res) => {
                console.log("res logout", res)
                if (res.data.status === 200) {
                    localStorage.clear();
                    localStorage.removeItem('user');
                    localStorage.removeItem('accessToken');
                    navigate("/")
                }

            }).catch((err) => {
                console.log("err logout", err)
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.clear();
            })
    }


    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, [headerShow])

    function handleResize() {
        if (window.screen.width <= 991) {
            console.log("window.screen.width", window.screen.width);
            setHeaderShow(false)
        } else {
            setHeaderShow(true)
        }
    }

    return (
        <>
            {
                headerShow ?
                    <section className='header_section web_view'>
                        <Navbar bg="light" expand="lg">
                            <Container>
                                <Navbar.Brand>
                                    <Link to="/">
                                        <img
                                            alt="headerlogo"
                                            src={logo}
                                            className=" align-top header_logo"
                                        />
                                        Slice Explorer
                                    </Link>

                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ms-auto">
                                        <Nav.Link as={NavLink} to="/" className='navbar_link'>Home</Nav.Link>
                                        <Nav.Link className='navbar_link' id="blockchainSubMenu">
                                            <span>Blockchain <FaAngleDown /></span>
                                            <div className='blockchain_dropdown'>
                                                <ul>
                                                    <li><Link to='/account'>Top Accounts</Link></li>
                                                    <li><Link to='/alltransaction'>View Txns</Link></li>
                                                    <li><Link to='/block'>View Blocks</Link></li>
                                                    <li> <Link to="/">Verified Contracts</Link></li>
                                                </ul>
                                            </div>
                                        </Nav.Link>


                                        {/* <Nav.Link className='navbar_link' id="validatorSubMenu">
                                    <span>Validators <FaAngleDown /></span>
                                    <div className='validator_dropdown'>
                                        <ul>
                                            <li><Link to='/valitors'> Validators Leaderboard</Link></li>
                                        </ul>
                                    </div>
                                </Nav.Link> */}


                                        <Nav.Link className='navbar_link' id="tokenSubMenu">
                                            <span>Tokens <FaAngleDown /></span>
                                            <div className='token_dropdown'>
                                                <ul>
                                                    <li><Link to='/slice20token'>SLICE-20 tokens</Link></li>
                                                </ul>
                                            </div>
                                        </Nav.Link>



                                        <Nav.Link className='navbar_link' id="miscSubMenu">
                                            <span>Misc <FaAngleDown /></span>
                                            <div className='misc_dropdown '>
                                                <ul>
                                                    <li><a href="https://slice-ledger.gitbook.io/sliceledger/api" target="_blank">APIs</a></li>
                                                    {/* <li><Link to='/valitors'> Validators Leaderboard</Link></li> */}
                                                </ul>
                                            </div>
                                        </Nav.Link>
                                        <Nav.Link as={NavLink} to="/signIn" className=' my-2 my-md-0' >
                                            <FaRegUserCircle /><span className='navbar_signbutton'>Sign In</span>
                                        </Nav.Link>

                                        {/* {
                                    (loggedUser == null) ?

                                        <Nav.Link as={NavLink} to="/signIn" className=' my-2 my-md-0' >
                                            <FaRegUserCircle /><span className='navbar_signbutton'>Sign In</span>
                                        </Nav.Link>
                                        :
                                        <Nav.Link className=' my-2 my-md-0' id="profileId">
                                            <FaRegUserCircle /><span className='navbar_signbutton'>{loggedUser.username} <FaAngleDown /></span>
                                            <div className='profile_dropdown'>
                                                <div className='name'><Link to="/myaccount">My Profile</Link></div>
                                                <hr></hr>
                                                <div className='name' onClick={handleLogout}>Logout</div>
                                            </div>
                                        </Nav.Link>
                                } */}

                                        <Nav.Link className='navbar_link' href="#">
                                            <div>
                                                <Image src={slice} alt='etheruem' className='header_eth' fluid />
                                            </div>
                                        </Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </section>

                    :

                    <section className='header_section mobile_view'>
                        <Navbar bg="light" expand="lg">
                            <Container>
                                <Navbar.Brand>
                                    <Link to="/">
                                        <img
                                            alt="headerlogo"
                                            src={logo}
                                            className=" align-top header_logo"
                                        />
                                        Slice Explorer
                                    </Link>

                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ms-auto">
                                        <Nav.Link as={NavLink} to="/" className='navbar_link'>Home</Nav.Link>

                                        <NavDropdown className='navbar_link' title="Blockchain" id="basic-nav-dropdown">
                                            <NavDropdown.Item >
                                                <Link to='/account'>Top Accounts</Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item>
                                                <Link to='/alltransaction'>View Txns</Link>
                                            </NavDropdown.Item>

                                            <NavDropdown.Item>
                                                <Link to='/block'>View Blocks</Link>
                                            </NavDropdown.Item>

                                            <NavDropdown.Item>
                                                <Link to="/">Verified Contracts</Link>
                                            </NavDropdown.Item>
                                        </NavDropdown>

                                        <NavDropdown className='navbar_link' title="Tokens" id="basic-nav-dropdown">
                                            <NavDropdown.Item>
                                                <Link to='/slice20token'>SLICE-20 tokens</Link>
                                            </NavDropdown.Item>
                                        </NavDropdown>

                                        <NavDropdown className='navbar_link' title="Misc" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="https://slice-ledger.gitbook.io/sliceledger/api" target="_blank">APIs</NavDropdown.Item>
                                        </NavDropdown>

                                        <Nav.Link as={NavLink} to="/signIn" className=' my-2 my-md-0' >
                                            <FaRegUserCircle /><span className='navbar_signbutton'>Sign In</span>
                                        </Nav.Link>

                                        {/* {
                                            (loggedUser == null) ?

                                                <Nav.Link as={NavLink} to="/signIn" className=' my-2 my-md-0' >
                                                    <FaRegUserCircle /><span className='navbar_signbutton'>Sign In</span>
                                                </Nav.Link>
                                                :
                                                <Nav.Link className=' my-2 my-md-0' id="profileId">
                                                    <FaRegUserCircle /><span className='navbar_signbutton'>{loggedUser.username} <FaAngleDown /></span>
                                                    <div className='profile_dropdown'>
                                                        <div className='name'><Link to="/myaccount">My Profile</Link></div>
                                                        <hr></hr>
                                                        <div className='name' onClick={handleLogout}>Logout</div>
                                                    </div>
                                                </Nav.Link>
                                        } */}

                                        <Nav.Link className='navbar_link' href="#">
                                            <div>
                                                <Image src={slice} alt='etheruem' className='header_eth' fluid />
                                            </div>
                                        </Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </section>
            }

        </>
    )
}




