import React from 'react'
import AddressOverview from './AddressOverview'
import AddressTransaction from './AddressTransaction'
import Hero from '../landing/Hero'

function Address() {
  return (
    <>
       <section className='innerHeroSection'> <Hero /></section>
        <section className='address_wrap'>
            <AddressOverview/>
            <AddressTransaction/>
        </section>
    </>
  )
}

export default Address