import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LandSectionHeader from '../components/LandSectionHeader'
import { getActivePackages, getGlobalSettings } from '../api-client'
import { useQuery } from 'react-query'
import { Container } from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import { range, translateText } from '../misc/helpers'
import PackageLand from '../components/cards/PackageLand'
import type { Package } from '../misc/types'
import ASwitch from '../components/form/ASwitch'
import Button from '../components/form/Button'
import { useNavigate } from 'react-router-dom'

const Packages = (): React.JSX.Element => {
  const [isYearly, setIsYearly] = useState<boolean>(false)

  const navigateTo = useNavigate()
  const [language, i18next] = useTranslation("global")

  const { data, isLoading } = useQuery(
    ['active-packages'],
    () => getActivePackages({ page: 1, limit: 3 })
  );
  const { data: global } = useQuery("settings", getGlobalSettings)

  const currentLanguage = i18next.language
  const title = translateText(currentLanguage, global?.arPackagesTitle, global?.hePackagesTitle, global?.enPackagesTitle)
  const subtitle = translateText(currentLanguage, global?.arPackagesSubtitle, global?.hePackagesSubtitle, global?.enPackagesSubtitle)

  if (!isLoading && (!data || !data.packages || !data.packages.length))
    return <></>

  return (
    <section id='packages' className='bg-gradient-main-background-reverse'>
      <Container>
        <div data-ani="down">
          <LandSectionHeader msg={title} description={subtitle} />
        </div>

        <div className="mb-5 flex-center gap-3" data-ani="popup-up" data-delay={0.3} style={{direction: "ltr"}}>
          {language("pages.landing.packages.monthly")}
          <ASwitch value={isYearly} setValue={setIsYearly} />
          {language("pages.landing.packages.yearly")}
        </div>

        <div className='flex-center gap-3 flex-wrap' data-ani="up" data-delay={0.5}>
          {
            isLoading
              ? range(1, 3).map(i =>
                <LoadingBox key={`loading-package-${i}`} className='rounded' width={250} height={420} />
              )
              : data.packages.map((pkg: Package) =>
                <PackageLand key={`package-${pkg.id}`} package={pkg} isYearly={isYearly} fantastic />
              )
          }
        </div>

        <Button onClick={() => navigateTo("/all-packages")} variant='main-outline' className='btn mt-5 mx-auto d-block'>{language("common.explore-more")}</Button>
      </Container>
    </section >
  )
}

export default Packages