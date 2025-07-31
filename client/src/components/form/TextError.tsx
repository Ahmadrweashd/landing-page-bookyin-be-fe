import React from 'react'
import type { TextErrorProps } from '../../misc/types'

const TextError: React.FC<TextErrorProps> = ({ msg }): React.JSX.Element => {
  return (
    <div className='text-danger fw-medium error fs-sm'>
      {msg}
    </div>
  )
}

export default TextError
