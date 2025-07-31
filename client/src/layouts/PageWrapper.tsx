import React from 'react'
import HeaderDash from './HeaderDash'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const PageWrapper = (): React.JSX.Element => {
  return (
    <div id="manager-wrapper" className='h-100vh overflow-hidden'>
      <HeaderDash />

      <div className="d-flex">
        <Sidebar />

        <Outlet/>
      </div>
    </div>
  )
}

export default PageWrapper