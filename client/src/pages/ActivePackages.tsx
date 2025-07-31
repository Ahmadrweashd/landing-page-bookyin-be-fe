import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { getActivePackages } from '../api-client';
import { Container } from 'react-bootstrap';
import ASwitch from '../components/form/ASwitch';
import PackageLand from '../components/cards/PackageLand';
import LoadingBox from '../components/LoadingBox';
import type { Package } from '../misc/types';
import { range } from '../misc/helpers';

const ActivePackages = (): React.JSX.Element => {
  const [isYearly, setIsYearly] = useState<boolean>(false)

  const [language] = useTranslation("global")
  const { data, isLoading } = useQuery(
    ['active-packages'],
    () => getActivePackages({ page: 1, limit: 200 })
  );

  if (!isLoading && (!data || !data.packages || !data.packages.length))
    return <></>

  return (
    <div id='all-packages' className='bg-background py-5'>
      <div className="mb-5 flex-center gap-3">
        {language("pages.landing.packages.monthly")}
        <ASwitch value={isYearly} setValue={setIsYearly} />
        {language("pages.landing.packages.yearly")}
      </div>
      <Container>
        <div className='fantastic-packages-container flex-center gap-3 flex-wrap'>
          {
            isLoading
              ? range(1, 3).map(i =>
                <LoadingBox key={`loading-package-${i}`} className='rounded' width={250} height={420} />
              )
              : data.packages.map((pkg: Package) =>
                <PackageLand key={`packages-${pkg.id}`} package={pkg} isYearly={isYearly} />
              )
          }
        </div>
      </Container>
    </div>
  )
}

export default ActivePackages