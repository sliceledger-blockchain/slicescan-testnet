import React from 'react'
import BlocksAndTransactions from './BlocksAndTransactions/BlocksAndTransactions'
import Hero from "./Hero"
import OverView from './OverView'

const Landing = () => {

  return (
    <>
      <Hero />
      <OverView />
      <BlocksAndTransactions />
    </>
  )
}

export default Landing
