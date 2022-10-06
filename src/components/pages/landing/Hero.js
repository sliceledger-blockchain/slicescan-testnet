import axios from 'axios';
import React, { useState } from 'react';
import { InputGroup, Button, Form, Container, Spinner } from "react-bootstrap";
import { BiSearch } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import { Web3 } from '../../../Web3Provider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Hero = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)


    


    const handleSearch = () => {
        setLoading(true)
        if (search) {
            Web3.eth.net.isListening()
                .then((data) => {
                    if (data) {
                        if (search.length === 42 && search.slice(0, 2) === "0x") {
                            setLoading(true)
                            var isAddress = Web3.utils.isAddress(search)
                            if (isAddress === true) {
                                navigate(`/address/${search}`)
                                setLoading(false)
                            }
                            if (isAddress === false) {
                                toast.error('Enter valid Address', {
                                    position: "top-center",
                                    autoClose: 2000,
                                    theme: "colored",
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                                setLoading(false)
                            }
                        } else if (search.length === 66 && search.slice(0, 2) === "0x") {
                            setLoading(true)
                            Web3.eth.getTransaction(search.toString())
                                .then((data) => {

                                    if (data) {
                                        navigate(`/transaction_details/tx/${search}`)
                                        setLoading(false)
                                    } else {
                                        toast.error('Enter valid Txn Hash', {
                                            position: "top-center",
                                            autoClose: 2000,
                                            theme: "colored",
                                            hideProgressBar: true,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                        setLoading(false)
                                    }
                                })
                                .catch((error) => {
                                    setLoading(false)
                                    console.log("error", error)

                                })
                        } else {
                            console.log("dfdfdf")
                            setLoading(true)
                            Web3.eth.getBlock(search)
                                .then((data) => {
                                    console.log("data", data)
                                    if (data) {
                                        navigate(`/block_details/block/${search}`)
                                        setLoading(false)
                                    } else {
                                        toast.error('Enter valid Block', {
                                            position: "top-center",
                                            autoClose: 2000,
                                            theme: "colored",
                                            hideProgressBar: true,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                        setLoading(false)
                                    }
                                })
                                .catch((error) => {
                                    if (error) {
                                        toast.error('Enter valid Address / Txn Hash / Block', {
                                            position: "top-center",
                                            autoClose: 2000,
                                            theme: "colored",
                                            hideProgressBar: true,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                        setLoading(false)
                                    }

                                })
                        }
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    toast.error('Enter valid Address / Txn Hash / Block', {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "colored",
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })

        }else{
            toast.error('Enter valid Address / Txn Hash / Block', {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoading(false)
        }
    }


    const enterText = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {
            handleSearch();
        }
    }



    return (
        <>
            <section className='hero_wrap'>
                <Container>
                    <div className='hero_title'>
                        <h2 className='h2_title'>SLICE Blockchain Explorer</h2>
                    </div>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search by Address / Txn Hash / Block "
                            aria-label="Search by Address / Txn Hash / Block "
                            aria-describedby="basic-addon2"
                            className='input_field'
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={enterText}
                        />
                        <Button variant="outline-secondary" id="button-addon2" className='primary_btn' onClick={handleSearch} style={{ width: "50px" }}>
                            {loading ?
                                <>
                                    <Spinner animation="border" variant="text-dark" size="sm" />
                                </>

                                :
                                <BiSearch />
                            }


                        </Button>
                    </InputGroup>

                </Container>
            </section>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
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

export default Hero