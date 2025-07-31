import React from 'react'
import type { LandSectionHeaderProps } from '../misc/types'

const LandSectionHeader: React.FC<LandSectionHeaderProps> = ({ msg, description }): React.ReactNode => {
  return (
    <div className='land-section-header mb-5 pb-5 text-center'>
      <h1 className='w-fit mx-auto position-relative'>{msg}</h1>
      {
        description &&
        <p className='text-muted'>{description}</p>
      }
    </div>
  )
}

export default LandSectionHeader