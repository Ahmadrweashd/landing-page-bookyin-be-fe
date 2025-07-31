import React from 'react'
import type { ASwitchProps } from '../../misc/types'
import { cn } from '../../misc/helpers'

const ASwitch: React.FC<ASwitchProps> = ({
  value,
  setValue,
}) => {
  return (
    <div className='a-switch user-select-none position-relative'>
      <div
        className="switch-slider bg-background rounded-pill position-relative pointer transition-03"
        role='switch'
        aria-checked={value}
        tabIndex={0}
        onClick={() => setValue(!value)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') setValue(!value)
        }}
      >
        <div
          className={cn(
            value,
            "checked bg-main",
            "bg-secondary",
            "switch-handle rounded-circle shadow-sm position-absolute transition-03"
          )}
        />
      </div>
    </div>
  )
}

export default ASwitch
