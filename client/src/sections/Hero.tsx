import React from 'react'
import Logo from "../assets/images/logo.png"
import Booking from "../assets/images/booking.png"
import { Col, Container } from 'react-bootstrap'
import Button from '../components/form/Button'
import { useTranslation } from 'react-i18next'
import { cn, range, translateText } from '../misc/helpers'
import { getGlobalSettings } from '../api-client'
import { useQuery } from 'react-query'
import LoadingBox from '../components/LoadingBox'

const Hero = (): React.JSX.Element => {
  const [language, i18next] = useTranslation("global")

  const currentLanguage = i18next.language

  const { data, isLoading } = useQuery(
    ['settings'],
    () => getGlobalSettings()
  );

  const title = translateText(currentLanguage, data?.arTitle, data?.heTitle, data?.enTitle)
  const subtitle = translateText(currentLanguage, data?.arSubtitle, data?.heSubtitle, data?.enSubtitle)
  const customerTitle = translateText(currentLanguage, data?.arHeroCustomersTitle, data?.heHeroCustomersTitle, data?.enHeroCustomersTitle)
  const packagesTitle = translateText(currentLanguage, data?.arHeroPackagesTitle, data?.heHeroPackagesTitle, data?.enHeroPackagesTitle)
  const customerSubtitle = translateText(currentLanguage, data?.arHeroCustomersSubtitle, data?.heHeroCustomersSubtitle, data?.enHeroCustomersSubtitle)
  const packagesSubtitle = translateText(currentLanguage, data?.arHeroPackagesSubtitle, data?.heHeroPackagesSubtitle, data?.enHeroPackagesSubtitle)

  return (
    <section id='hero' className='bg-gradient-main-background min-h-100vh flex-center position-relative'>
      <div className="overlay position-absolute top-0 end-0 bottom-0 start-0" style={{ backgroundImage: `url(${Logo})` }} />

      <Container className={cn(
        currentLanguage === "en",
        "text-lg-start",
        "text-lg-end",
        "mt-5 py-5 px-lg-5 row align-items-center text-center text-capitalize text-main-dark"
      )}>
        <Col lg={8} className="left-banner">
          <h1 className='mb-3 fw-bold display-4' data-ani="down">
            {title}
          </h1>

          <p
            data-ani="down"
            data-delay={0.3}
            className={cn(
              currentLanguage === "en",
              "pe-lg-5",
              "ps-5",
              "mb-4 fw-semibold lead"
            )}>{subtitle}
          </p>
          <div
            className="mb-3 flex-center justify-content-lg-start flex-sm-row flex-column gap-2"
            data-ani="down"
            data-delay={0.6}
          >
            <Button className='btn p-0 overflow-hidden' variant='main'>
              <a href="#customers" className='btn px-4 w-100 h-100 d-block text-white'>{language("pages.landing.hero.buttons.explore-customers")}</a>
            </Button>
            <Button className='btn p-0 overflow-hidden' variant='main-gradient'>
              <a href="#packages" className='btn px-4 w-100 h-100 d-block text-white'>{language("pages.landing.hero.buttons.subscribe")}</a>
            </Button>
          </div>

          <div
            className="data-counts flex-center justify-content-lg-start gap-2 flex-wrap"
            data-ani="down"
            data-delay={0.9}
          >
            {
              isLoading
                ? range(1, 2).map(i => <LoadingBox key={`customers-packages-no-loading-${i}`} width={180} height={75} />)
                : <>
                  <div className="bg-transparent p-3">
                    <h2 className="mb-1 text-black">+{data.customersNumber}</h2>
                    {customerTitle.trim() &&
                      <p className="mb-0 fw-semibold">{customerTitle}</p>
                    }
                    {
                      customerSubtitle.trim() &&
                      <small className="text-muted">{customerSubtitle}</small>
                    }
                  </div>
                  <div className="bg-transparent p-3">
                    <h2 className="mb-1 text-black">+{data.packagesNumber}</h2>
                    {
                      packagesTitle.trim() &&
                      <p className="mb-0 fw-semibold">{packagesTitle}</p>
                    }
                    {
                      packagesSubtitle.trim() &&
                      <small className="text-muted">{packagesSubtitle}</small>
                    }
                  </div>
                </>
            }
          </div>
        </Col>

        <Col lg={4} className="right-banner d-lg-block d-none">
          <img
            data-ani={currentLanguage === "en" ? "left" : "right"}
            src={Booking}
            alt='hero-image'
            title='hero-image'
            width={"100%"}
            height={350}
          />
        </Col>
      </Container>
    </section>
  )
}

export default Hero
