import React from 'react'
import Button from '../components/form/Button'
import NotFoundImg from "../assets/images/not-found.png"
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFound = (): React.ReactNode => {
  const navigateTo = useNavigate()
  const language = useTranslation("global")[0]

  const navigateBack = () => navigateTo('/', { replace: true })

  return (
    <main className='bg-white h-screen flex-center flex-column'>
      <img width={265} height={265} alt='not-found' src={NotFoundImg} />
      <h1 className='py-3 text-capitalize text-center fw-bold'>{language("components.not-found.msg")}</h1>
      <Button variant='main' className='py-2 px-5 rounded-pill text-capitalize' onClick={navigateBack}>{language("components.not-found.btn")}</Button>
    </main>
  )
}

export default NotFound