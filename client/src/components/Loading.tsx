import React from 'react'
import LogoVideo from "../assets/logo.mp4"

const Loading = (): React.JSX.Element => {
  return (
    <div className='flex-center w-100 h-100vh w-screen bg-black overflow-hidden'>
      <video
        src={LogoVideo}
        autoPlay
        loop
        muted
        playsInline
        width={800}
        height={800}
        className='object-contain'
      />
    </div>
  )
}

export default Loading
