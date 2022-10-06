import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Accordion, Button } from 'react-bootstrap';
import { FaArrowCircleRight } from 'react-icons/fa';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import FormData from 'form-data';
import $ from 'jquery'

function VerifyPublish() {
  const [labName_1, setLabName_1] = useState("")
  const [labName_2, setLabName_2] = useState("")
  const [labName_3, setLabName_3] = useState("")
  const [labName_4, setLabName_4] = useState("")
  const [labName_5, setLabName_5] = useState("")
  const [labName_6, setLabName_6] = useState("")
  const [labName_7, setLabName_7] = useState("")
  const [labName_8, setLabName_8] = useState("")
  const [labName_9, setLabName_9] = useState("")
  const [labName_10, setLabName_10] = useState("")

  const [labAddress_1, setLabAddress_1] = useState("")
  const [labAddress_2, setLabAddress_2] = useState("")
  const [labAddress_3, setLabAddress_3] = useState("")
  const [labAddress_4, setLabAddress_4] = useState("")
  const [labAddress_5, setLabAddress_5] = useState("")
  const [labAddress_6, setLabAddress_6] = useState("")
  const [labAddress_7, setLabAddress_7] = useState("")
  const [labAddress_8, setLabAddress_8] = useState("")
  const [labAddress_9, setLabAddress_9] = useState("")
  const [labAddress_10, setLabAddress_10] = useState("")

  const [_contractAddress, setContractAddress] = useState()
  const [compilerVersion, setCompilerVersion] = useState()
  const [contractName, setContractName] = useState()
  const [code, setCode] = useState("")
  const [abi, setAbi] = useState("")
  const [runOtimizer, setRunOtimizer] = useState(200)
  const [evmVersion, setEVMVersion] = useState("")
  const [licenseType, setLicenseType] = useState("")
  const [optimization, setOptimization] = useState("")


  useEffect(() => {
    $("#contractNameErr").hide()
    $("#souceErr").hide()
    $("#licensetypeErr").hide()
}, [])

$(".validate").focus(function(){
  $("#contractNameErr").hide()
    $("#souceErr").hide()
    $("#licensetypeErr").hide()
})


  useEffect(() => {
    const contractAddress = JSON.parse(localStorage.getItem("contractAddress_info"));
    if (contractAddress) {
      setContractAddress(contractAddress.contractAddress)
      setCompilerVersion(contractAddress.compilerVersion)
    }
  }, [])

  let captcha = "6Lf3IIghAAAAAI6aMGCoCyq360MYicArZ03BGNPL"
  function onChange(value) {
    console.log("Captcha value:", value);
  }






  const submitHander = () => {
      
       if(contractName === "" || contractName === undefined){
        $("#contractNameErr").show()
       }
       if(code === ''){
        $("#souceErr").show()
       }

       if(licenseType === ""){
        $("#licensetypeErr").show()
       }

    var formdata = new FormData();
    formdata.append("apikey", "3GA35NJQ8QFA6REYIKPXNQ9232YS4MSI67")
    formdata.append("module", "contract")
    formdata.append("action", "verifysourcecode")
    formdata.append("contractaddress", _contractAddress)
    formdata.append("sourceCode", code)
    formdata.append("contractname", contractName)
    formdata.append("codeformat", "solidity-single-file")
    formdata.append("compilerversion", compilerVersion)
    formdata.append("optimizationUsed", optimization)
    formdata.append("runs", runOtimizer)
    formdata.append("constructorArguements", "")
    formdata.append("evmversion", evmVersion)
    formdata.append("licenseType", licenseType)
    formdata.append("libraryname1", labName_1)
    formdata.append("libraryaddress1", labAddress_1)
    formdata.append("libraryname2", labName_2)
    formdata.append("libraryname7", labName_7)
    formdata.append("libraryaddress7", labAddress_7)
    formdata.append("libraryname8", labName_8)
    formdata.append("libraryaddress8", labAddress_8)
    formdata.append("libraryname9", labName_9)
    formdata.append("libraryaddress9", labAddress_9)
    formdata.append("libraryname10", labName_10)
    formdata.append("libraryaddress10", labAddress_10)


    axios.post("//api-rinkeby.etherscan.io/api", formdata)
      .then((data) => {
        console.log("data", data)

      })
      .catch((error) => {
        console.log("error", error)
      })

  }


  useEffect(() => {
    var formdata = new FormData();
    formdata.append("apikey", "3GA35NJQ8QFA6REYIKPXNQ9232YS4MSI67")
    formdata.append("module", "contract")
    formdata.append("guid", "bidruweny8j7yjmd5rbwmitwvhnbh2pcf1anw4uganc6pda9pm")
    formdata.append("action", "checkverifystatus")

    axios.get("//api-rinkeby.etherscan.io/api", formdata)
      .then((data) => {
        console.log("data", data.data.result)
      })
      .catch((error) => {
        console.log("error", error)
      })
  }, [])


  const emptyState = () => {
    setCode("")
    setAbi("")
    setRunOtimizer()
    setEVMVersion("")
    setLicenseType("")
  }






  return (
    <>
      <section className='verifyPublish_wrap'>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={12}>
              <div className='verify_contract_form'>
                <div className='note'>
                  <ol>
                    <li>If the contract compiles correctly at REMIX,it should also complie correctly here.</li>
                    <li>We have limited support for verifying contracts created by another contract and there is a timeout of up to 45 seconds for each contract compiled.</li>
                    <li>For programatic contract verification, check out the Contract API Endpoint</li>
                  </ol>
                </div>

                <Row className="mb-3 mt-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Contract Address</Form.Label>
                    <Form.Control placeholder={_contractAddress} disabled />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Contract Name</Form.Label>
                    <Form.Control className="validate" type='text' value={contractName} onChange={(e) => setContractName(e.target.value)} />
                    <p className='error_msg' id='contractNameErr'>*Please enter the Contract Name</p>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Optimization</Form.Label>
                    <Form.Select aria-label="Optimization" onChange={(e) => setOptimization(e.target.value)}>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Enter the Solidity Contract Code below<span>*</span></Form.Label>
                  <Form.Control className="validate" as="textarea" value={code} rows={5} onChange={(e) => setCode(e.target.value)} />
                  <p className='error_msg' id='souceErr'>*Please enter the Solidity Contract Code</p>
                </Form.Group>


                <div className='accordin_section'>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <Form.Label>Constructor Arguments ABI-encoded((for contracts that were created with constructor parameters))</Form.Label>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Form.Control as="textarea" rows={5} onChange={(e) => setAbi(e.target.value)} />
                        <p className='accordian_note'>For additional information on Constructor Arguments see Our KB Entry </p>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <Form.Label>
                          Contract Library Address(for contracts that use libraries, supports up to 10 libraries)
                        </Form.Label>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className='libary_note'>Note: Library names are case sensitive and affects the keccak library hash</p>
                        <div className='library_main'>
                          <div className='libaray_content'>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_1 Name:</Form.Label>
                              <Form.Control onChange={(e) => { setLabName_1(e.target.value) }} />
                            </div>
                            <div className='libary_icon'>
                              <FaArrowCircleRight />
                            </div>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_1 Contract Address:</Form.Label>
                              <Form.Control onChange={(e) => { setLabAddress_1(e.target.value) }} />
                            </div>
                          </div>

                          <div className='libaray_content'>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_2 Name:</Form.Label>
                              <Form.Control onChange={(e) => { setLabName_2(e.target.value) }} />
                            </div>
                            <div className='libary_icon'>
                              <FaArrowCircleRight />
                            </div>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_2 Contract Address:</Form.Label>
                              <Form.Control onChange={(e) => { setLabAddress_2(e.target.value) }} />
                            </div>
                          </div>

                          <div className='libaray_content'>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_3 Name:</Form.Label>
                              <Form.Control onChange={(e) => { setLabName_3(e.target.value) }} />
                            </div>
                            <div className='libary_icon'>
                              <FaArrowCircleRight />
                            </div>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_3 Contract Address:</Form.Label>
                              <Form.Control onChange={(e) => { setLabAddress_3(e.target.value) }} />
                            </div>
                          </div>

                          <div className='libaray_content'>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_4 Name:</Form.Label>
                              <Form.Control onChange={(e) => { setLabName_4(e.target.value) }} />
                            </div>
                            <div className='libary_icon'>
                              <FaArrowCircleRight />
                            </div>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_4 Contract Address:</Form.Label>
                              <Form.Control onChange={(e) => { setLabAddress_4(e.target.value) }} />
                            </div>
                          </div>


                          <div className='libaray_content'>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_5 Name:</Form.Label>
                              <Form.Control onChange={(e) => { setLabName_5(e.target.value) }} />
                            </div>
                            <div className='libary_icon'>
                              <FaArrowCircleRight />
                            </div>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_5 Contract Address:</Form.Label>
                              <Form.Control onChange={(e) => { setLabAddress_5(e.target.value) }} />
                            </div>
                          </div>

                          <div className='libaray_content'>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_6 Name:</Form.Label>
                              <Form.Control onChange={(e) => { setLabName_6(e.target.value) }} />
                            </div>
                            <div className='libary_icon'>
                              <FaArrowCircleRight />
                            </div>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_6 Contract Address:</Form.Label>
                              <Form.Control onChange={(e) => { setLabAddress_6(e.target.value) }} />
                            </div>
                          </div>

                          <div className='libaray_content'>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_7 Name:</Form.Label>
                              <Form.Control onChange={(e) => { setLabName_7(e.target.value) }} />
                            </div>
                            <div className='libary_icon'>
                              <FaArrowCircleRight />
                            </div>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_7 Contract Address:</Form.Label>
                              <Form.Control onChange={(e) => { setLabAddress_7(e.target.value) }} />
                            </div>
                          </div>

                          <div className='libaray_content'>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_8 Name:</Form.Label>
                              <Form.Control onChange={(e) => { setLabName_8(e.target.value) }} />
                            </div>
                            <div className='libary_icon'>
                              <FaArrowCircleRight />
                            </div>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_8 Contract Address:</Form.Label>
                              <Form.Control onChange={(e) => { setLabAddress_8(e.target.value) }} />
                            </div>
                          </div>

                          <div className='libaray_content'>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_9 Name:</Form.Label>
                              <Form.Control onChange={(e) => { setLabName_9(e.target.value) }} />
                            </div>
                            <div className='libary_icon'>
                              <FaArrowCircleRight />
                            </div>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_9 Contract Address:</Form.Label>
                              <Form.Control onChange={(e) => { setLabAddress_9(e.target.value) }} />
                            </div>
                          </div>

                          <div className='libaray_content'>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_10 Name:</Form.Label>
                              <Form.Control onChange={(e) => { setLabName_10(e.target.value) }} />
                            </div>
                            <div className='libary_icon'>
                              <FaArrowCircleRight />
                            </div>
                            <div className='libary_subcontent'>
                              <Form.Label>Library_10 Contract Address:</Form.Label>
                              <Form.Control onChange={(e) => { setLabAddress_10(e.target.value) }} />
                            </div>
                          </div>

                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <Form.Label>Misc Settings(Runs, EvmVersion & License Type settings)</Form.Label>
                      </Accordion.Header>
                      <Accordion.Body>

                        <Row className="mb-3 mt-3">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Runs (Optimizer)</Form.Label>
                            <Form.Control value={runOtimizer} onChange={(e) => setRunOtimizer(e.target.value)} />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>EVM Version to target</Form.Label>
                            <Form.Select size="sm" onChange={(e) => setEVMVersion(e.target.value)}>
                              <option>default (compiler defaults)</option>
                              <option>homestead (oldest version)</option>
                              <option>tangerineWhistle</option>
                              <option>spuriousDragon</option>
                              <option>byzantium (default for v0.5.4)</option>
                              <option>constantinople</option>
                              <option>petersburg (default for v0.5.5)</option>
                              <option>istanbul (default for v0.5.14)</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>LicenseType </Form.Label>
                            <Form.Select className="validate" size="sm" onChange={(e) => setLicenseType(e.target.value)}>
                              <option value="1" >1)No License (None)</option>
                              <option value="2">2) The Unlicense (Unlicense)</option>
                              <option value="3" >3) MIT License (MIT)</option>
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
                              <option value="14">14) Business Source License (BSL 1.1)</option>
                            </Form.Select>
                            <p className='error_msg' id='licensetypeErr'>*Please select LicenseType</p>
                          </Form.Group>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                <div className='captcha_wrap'>
                  <ReCAPTCHA
                    sitekey={captcha}
                    onChange={onChange}
                    className="captcha"
                  />
                </div>


                <div className='verify_public_btton'>
                  <Button className='primary_btn' onClick={submitHander}>Verify and Public</Button>
                  <button className='reset_btn' onClick={emptyState}>Reset</button>
                  <button className='reset_btn'>Return to main</button>

                
                </div>


              </div>
            </Col>
          </Row>
        </Container>
      </section>





    </>
  )
}

export default VerifyPublish
