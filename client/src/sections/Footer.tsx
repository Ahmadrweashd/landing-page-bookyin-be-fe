import React from 'react'
import Logo from "../assets/images/logo.png"

const Footer = (): React.JSX.Element => {
  return (
    <section className='bg-dark py-1 flex-center text-main'>
      <img
        src={Logo}
        alt="logo"
        width={25}
        height={25}
      />
      Bookyin
    </section>
  )
}

export default Footer