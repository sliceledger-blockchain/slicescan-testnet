import React from 'react'
import ContractOverView from './ContractOverView'
import TransactionInfo from './TransactionInfo'

function ContractTransaction() {
  return (
    <>
    <section className='contractTransaction_wrap py-4'>
        <ContractOverView/>
        <TransactionInfo/>
    </section>
    </>
  )
}

export default ContractTransaction