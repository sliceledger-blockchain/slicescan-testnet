import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import check from '../../../asset/image/icon/check.svg'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import web3 from 'web3';
;

const VerifyContract = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    const darkmode = useSelector((state) => state.theme.darkmode);
    const [contractAddress, setContractAddress] = useState("")
    const [compilerVersion, setCompilerVersion] = useState("")
    const [licenseType, setLicenseType] = useState("")
    var navigate = useNavigate()

    var tokens = web3.utils.toWei("1922507299802476714" , 'ether')
  

    var bntokens = web3.utils.toBN(tokens)
    console.log("bntokens",bntokens)


    var demo =   web3.utils.fromWei('1', 'ether');
    console.log("demo,,,,,,",demo);
   


    useEffect(() => {
        $("#contractAddressErr").hide()
        $("#compilerversionErr").hide()
        $("#licensetypeErr").hide()
    }, [])


    $(".validate").focus(function () {
        $("#contractAddressErr").hide()
        $("#compilerversionErr").hide()
        $("#licensetypeErr").hide()
    })



    const contractObject = {
        "contractAddress": contractAddress,
        "compilerVersion": compilerVersion,
        "licenseType": licenseType
    }



    const submitHandler = async () => {

        if (contractObject.contractAddress === "") {
            $("#contractAddressErr").show()
        }
        if (contractObject.compilerVersion === "") {
            $("#compilerversionErr").show()
        }

        if (contractObject.licenseType === "") {
            $("#licensetypeErr").show()
        }

        if (contractObject.licenseType !== "" && contractObject.contractAddress !== "" && contractObject.compilerVersion !== "") {
            await localStorage.setItem("contractAddress_info", JSON.stringify({ ...contractObject }))
            navigate('/verifyAndPublishContract')
        }
    }


    const EmptyState = () => {
        setContractAddress("")
        setCompilerVersion("")
        setLicenseType("")
    }





    return (
        <>
            <section className={`verifyContract_wrap ${!darkmode ? "" : "dark_mode"}`}>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={12}>
                            <div className='verify_contract_head'>
                                <div className='main_head'>Verify & Publish Contract Source Code</div>
                                <div className="sub_head">COMPILER TYPE AND VERSION SELECTION</div>
                            </div>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <div className='verify_contract_main'>
                                <div className='img_check'>
                                    <img src={check} className='img-fluid' alt='img'></img>
                                </div>
                                <div className='para'>
                                    Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, PolygonScan will match the compiled code with that on the blockchain. Just like contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is supposed to do.
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col lg={6}>
                            <div className='verify_contract_form'>
                                <div className='contract_input'>
                                    <label>Please enter the Contract Address you would like to verify</label>
                                    <input type="text" className="validate form-control" placeholder="0x..." value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
                                    <p className='error_msg' id='contractAddressErr'>*Please enter the Contract Address</p>
                                </div><br></br>


                                <div className='select_compiler_version'>
                                    <label>Please select Compiler Version</label>
                                    <select className='validate form-control' value={compilerVersion} onChange={(e) => setCompilerVersion(e.target.value)}>
                                        <option value="">[Please Select]</option>
                                        <option value="v0.8.16+commit.07a7930e">v0.8.16+commit.07a7930e</option>
                                        <option value="v0.8.15+commit.e14f2714">v0.8.15+commit.e14f2714</option>
                                        <option value="v0.8.14+commit.80d49f37">v0.8.14+commit.80d49f37</option>
                                        <option value="v0.8.13+commit.abaa5c0e">v0.8.13+commit.abaa5c0e</option>
                                        <option value="v0.8.12+commit.f00d7308">v0.8.12+commit.f00d7308</option>
                                        <option value="v0.8.11+commit.d7f03943">v0.8.11+commit.d7f03943</option>
                                        <option value="v0.8.10+commit.fc410830">v0.8.10+commit.fc410830</option>
                                        <option value="v0.8.9+commit.e5eed63a">v0.8.9+commit.e5eed63a</option>
                                        <option value="v0.8.8+commit.dddeac2f">v0.8.8+commit.dddeac2f</option>
                                        <option value="v0.8.7+commit.e28d00a7">v0.8.7+commit.e28d00a7</option>
                                        <option value="v0.8.6+commit.11564f7e">v0.8.6+commit.11564f7e</option>
                                        <option value="v0.8.5+commit.a4f2e591">v0.8.5+commit.a4f2e591</option>
                                        <option value="v0.8.4+commit.c7e474f2">v0.8.4+commit.c7e474f2</option>
                                        <option value="v0.8.3+commit.8d00100c">v0.8.3+commit.8d00100c</option>
                                        <option value="v0.8.2+commit.661d1103">v0.8.2+commit.661d1103</option>
                                        <option value="v0.8.1+commit.df193b15">v0.8.1+commit.df193b15</option>
                                        <option value="v0.8.0+commit.c7dfd78e">v0.8.0+commit.c7dfd78e</option>
                                        <option value="v0.7.6+commit.7338295f">v0.7.6+commit.7338295f</option>
                                        <option value="v0.7.5+commit.eb77ed08">v0.7.5+commit.eb77ed08</option>
                                        <option value="v0.7.4+commit.3f05b770">v0.7.4+commit.3f05b770</option>
                                        <option value="v0.7.3+commit.9bfce1f6">v0.7.3+commit.9bfce1f6</option>
                                        <option value="v0.7.2+commit.51b20bc0">v0.7.2+commit.51b20bc0</option>
                                        <option value="v0.7.1+commit.f4a555be">v0.7.1+commit.f4a555be</option>
                                        <option value="v0.7.0+commit.9e61f92b">v0.7.0+commit.9e61f92b</option>
                                        <option value="v0.6.12+commit.27d51765">v0.6.12+commit.27d51765</option>
                                        <option value="v0.6.11+commit.5ef660b1">v0.6.11+commit.5ef660b1</option>
                                        <option value="v0.6.10+commit.00c0fcaf">v0.6.10+commit.00c0fcaf</option>
                                        <option value="v0.6.9+commit.3e3065ac">v0.6.9+commit.3e3065ac</option>
                                        <option value="v0.6.8+commit.0bbfe453">v0.6.8+commit.0bbfe453</option>
                                        <option value="v0.6.7+commit.b8d736ae">v0.6.7+commit.b8d736ae</option>
                                        <option value="v0.6.6+commit.6c089d02">v0.6.6+commit.6c089d02</option>
                                        <option value="v0.6.5+commit.f956cc89">v0.6.5+commit.f956cc89</option>
                                        <option value="v0.6.4+commit.1dca32f3">v0.6.4+commit.1dca32f3</option>
                                        <option value="v0.6.3+commit.8dda9521">v0.6.3+commit.8dda9521</option>
                                        <option value="v0.6.2+commit.bacdbe57">v0.6.2+commit.bacdbe57</option>
                                        <option value="v0.6.1+commit.e6f7d5a4">v0.6.1+commit.e6f7d5a4</option>
                                        <option value="v0.6.0+commit.26b70077">v0.6.0+commit.26b70077</option>
                                        <option value="v0.5.17+commit.d19bba13">v0.5.17+commit.d19bba13</option>
                                        <option value="v0.5.16+commit.9c3226ce">v0.5.16+commit.9c3226ce</option>
                                        <option value="v0.5.15+commit.6a57276f">v0.5.15+commit.6a57276f</option>
                                        <option value="v0.5.14+commit.01f1aaa4">v0.5.14+commit.01f1aaa4</option>
                                        <option value="v0.5.13+commit.5b0b510c">v0.5.13+commit.5b0b510c</option>
                                        <option value="v0.5.12+commit.7709ece9">v0.5.12+commit.7709ece9</option>
                                        <option value="v0.5.11+commit.c082d0b4">v0.5.11+commit.c082d0b4</option>
                                        <option value="v0.5.10+commit.5a6ea5b1">v0.5.10+commit.5a6ea5b1</option>
                                        <option value="v0.5.9+commit.e560f70d">v0.5.9+commit.e560f70d</option>
                                        <option value="v0.5.8+commit.23d335f2">v0.5.8+commit.23d335f2</option>
                                        <option value="v0.5.7+commit.6da8b019">v0.5.7+commit.6da8b019</option>
                                        <option value="v0.5.6+commit.b259423e">v0.5.6+commit.b259423e</option>
                                        <option value="v0.5.5+commit.47a71e8f">v0.5.5+commit.47a71e8f</option>
                                        <option value="v0.5.4+commit.9549d8ff">v0.5.4+commit.9549d8ff</option>
                                        <option value="v0.5.3+commit.10d17f24">v0.5.3+commit.10d17f24</option>
                                        <option value="v0.5.2+commit.1df8f40c">v0.5.2+commit.1df8f40c</option>
                                        <option value="v0.5.1+commit.c8a2cb62">v0.5.1+commit.c8a2cb62</option>
                                        <option value="v0.5.0+commit.1d4f565a">v0.5.0+commit.1d4f565a</option>
                                        <option value="v0.4.26+commit.4563c3fc">v0.4.26+commit.4563c3fc</option>
                                        <option value="v0.4.25+commit.59dbf8f1">v0.4.25+commit.59dbf8f1</option>
                                        <option value="v0.4.24+commit.e67f0147">v0.4.24+commit.e67f0147</option>
                                        <option value="v0.4.23+commit.124ca40d">v0.4.23+commit.124ca40d</option>
                                        <option value="v0.4.22+commit.4cb486ee">v0.4.22+commit.4cb486ee</option>
                                        <option value="v0.4.21+commit.dfe3193c">v0.4.21+commit.dfe3193c</option>
                                        <option value="v0.4.20+commit.3155dd80">v0.4.20+commit.3155dd80</option>
                                        <option value="v0.4.19+commit.c4cbbb05">v0.4.19+commit.c4cbbb05</option>
                                        <option value="v0.4.18+commit.9cf6e910">v0.4.18+commit.9cf6e910</option>
                                        <option value="v0.4.17+commit.bdeb9e52">v0.4.17+commit.bdeb9e52</option>
                                        <option value="v0.4.16+commit.d7661dd9">v0.4.16+commit.d7661dd9</option>
                                        <option value="v0.4.15+commit.bbb8e64f">v0.4.15+commit.bbb8e64f</option>
                                        <option value="v0.4.14+commit.c2215d46">v0.4.14+commit.c2215d46</option>
                                        <option value="v0.4.13+commit.0fb4cb1a">v0.4.13+commit.0fb4cb1a</option>
                                        <option value="v0.4.12+commit.194ff033">v0.4.12+commit.194ff033</option>
                                        <option value="v0.4.11+commit.68ef5810">v0.4.11+commit.68ef5810</option>
                                        <option value="v0.4.10+commit.f0d539ae">v0.4.10+commit.f0d539ae</option>
                                        <option value="v0.4.9+commit.364da425">v0.4.9+commit.364da425</option>
                                        <option value="v0.4.8+commit.60cc1668">v0.4.8+commit.60cc1668</option>
                                        <option value="v0.4.7+commit.822622cf">v0.4.7+commit.822622cf</option>
                                        <option value="v0.4.6+commit.2dabbdf0">v0.4.6+commit.2dabbdf0</option>
                                        <option value="v0.4.5+commit.b318366e">v0.4.5+commit.b318366e</option>
                                        <option value="v0.4.4+commit.4633f3de">v0.4.4+commit.4633f3de</option>
                                        <option value="v0.4.3+commit.2353da71">v0.4.3+commit.2353da71</option>
                                        <option value="v0.4.2+commit.af6afb04">v0.4.2+commit.af6afb04</option>
                                        <option value="v0.4.1+commit.4fc6fc2c">v0.4.1+commit.4fc6fc2c</option>
                                        <option value="v0.4.0+commit.acd334c9">v0.4.0+commit.acd334c9</option>
                                        <option value="v0.3.6+commit.3fc68da5">v0.3.6+commit.3fc68da5</option>
                                        <option value="v0.3.5+commit.5f97274a">v0.3.5+commit.5f97274a</option>
                                        <option value="v0.3.4+commit.7dab8902">v0.3.4+commit.7dab8902</option>
                                        <option value="v0.3.3+commit.4dc1cb14">v0.3.3+commit.4dc1cb14</option>
                                        <option value="v0.3.2+commit.81ae2a78">v0.3.2+commit.81ae2a78</option>
                                        <option value="v0.3.1+commit.c492d9be">v0.3.1+commit.c492d9be</option>
                                        <option value="v0.3.0+commit.11d67369">v0.3.0+commit.11d67369</option>
                                        <option value="v0.2.2+commit.ef92f566">v0.2.2+commit.ef92f566</option>
                                        <option value="v0.2.1+commit.91a6b35f">v0.2.1+commit.91a6b35f</option>
                                        <option value="v0.2.0+commit.4dc2445e">v0.2.0+commit.4dc2445e</option>
                                        <option value="v0.1.7+commit.b4e666cc">v0.1.7+commit.b4e666cc</option>
                                        <option value="v0.1.6+commit.d41f8b7c">v0.1.6+commit.d41f8b7c</option>
                                        <option value="v0.1.5+commit.23865e39">v0.1.5+commit.23865e39</option>
                                        <option value="v0.1.4+commit.5f6c3cdf">v0.1.4+commit.5f6c3cdf</option>
                                        <option value="v0.1.3+commit.028f561d">v0.1.3+commit.028f561d</option>
                                        <option value="v0.1.2+commit.d0d36e3">v0.1.2+commit.d0d36e3</option>
                                        <option value="v0.1.1+commit.6ff4cd6">v0.1.1+commit.6ff4cd6</option>
                                    </select>
                                    <p className='error_msg' id='compilerversionErr'>*Please select Compiler Version</p>
                                </div><br></br>

                                <div className='select_version_type'>
                                    <label>Please select Open Source License Type </label>
                                    <select className='validate form-control' value={licenseType} onChange={(e) => setLicenseType(e.target.value)}>
                                        <option value="0">[Please Select]</option>
                                        <option value="1">1) No License (None)</option>
                                        <option value="2">2) The Unlicense (Unlicense)</option>
                                        <option value="3">3) MIT License (MIT)</option>
                                        <option value="4">4) GNU General Public License v2.0 (GNU GPLv2)</option>
                                        <option value="5">5) GNU General Public License v3.0 (GNU GPLv3)</option>
                                        <option value="6">6) GNU Lesser General Public License v2.1 (GNU LGPLv2.1)</option>
                                        <option value="7">7) GNU Lesser General Public License v3.0 (GNU LGPLv3)</option>
                                        <option value="8">8) BSD 2-clause "Simplified" license (BSD-2-Clause)</option>
                                        <option value="9">9) BSD 3-clause "New" Or "Revised" license (BSD-3-Clause)</option>
                                        <option value="10">10) Mozilla Public License 2.0 (MPL-2.0)</option>
                                        <option value="11">11) Open Software License 3.0 (OSL-3.0)</option>
                                        <option value="12">12) Apache 2.0 (Apache-2.0)</option>
                                        <option value="13">13) GNU Affero General Public License (GNU AGPLv3)</option>
                                    </select>
                                    <p className='error_msg' id='licensetypeErr'>*Please select Open Source License Type</p>
                                </div><br></br>

                            </div><br></br>

                            <div className='verify_btns'>
                                <button className='reset_btn' onClick={EmptyState} >Reset</button>
                                <button className='primary_btn' onClick={submitHandler}>
                                    Continue
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>




        </>
    )
}

export default VerifyContract