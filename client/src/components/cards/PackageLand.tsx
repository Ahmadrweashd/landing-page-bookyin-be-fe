import React from 'react'
import type { PackageLandProps } from '../../misc/types'
import { Badge, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { cn, translateText } from '../../misc/helpers'
import Button from '../form/Button'
import { FaStar, FaCrown, FaRocket } from 'react-icons/fa'
import { BsCheckCircle, BsTag } from 'react-icons/bs';
import { FaClock } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const PackageLand: React.FC<PackageLandProps> = ({ package: pkg, isYearly = false, fantastic = false }): React.ReactNode => {
  const [language, i18next] = useTranslation("global")

  const navigateTo = useNavigate()
  const currentLanguage = i18next.language
  const note = translateText(currentLanguage, pkg.arNote, pkg.heNote, pkg.enNote)
  const servicesNote = translateText(currentLanguage, pkg.arServiceNote, pkg.heServiceNote, pkg.enServiceNote)

  return (
    <Card className={cn(
      pkg.type === "premium",
      "exclusive",
      null,
      cn(
        fantastic,
        "fantastic",
        null,
        "package-land-card py-3 px-2 border-0 rounded-3 shadow-sm position-relative"
      )
    )}>
      <div className="overlay bg-main rounded-3 position-absolute" />

      <div className='flex-center gap-2'>
        <div>
          {
            pkg.type === "premium" ? (
              <FaRocket className='text-main' size={24} title="Premium" />
            ) : pkg.type === "golden" ? (
              <FaCrown className='text-main' size={24} title="Golden" />
            ) : (
              <BsTag className='text-main' size={24} title="Standard" />
            )
          }
        </div>
        <h5 className='m-0 fw-semibold'>{language(`pages.landing.packages.type.${pkg.type}`)}</h5>
      </div>

      {
        pkg.isComingSoon &&
        <Badge bg='warning' className='m-3 flex-center-y gap-1 position-absolute top-0 start-0  text-black'>
          <FaClock />
          {language("pages.landing.packages.soon")}
        </Badge>
      }

      <p className='fs-6 text-muted'>{note}</p>

      <div className="text-center">
        {
          isYearly
            ? pkg.priceYearly > 0 && <React.Fragment>
              <p className='m-0 mt-3 fw-medium display-3'>₪{pkg.priceYearly}</p>
              <span className='fs-sm text-lowercase text-muted'>/{language("pages.landing.packages.monthly")}</span>
            </React.Fragment>
            : pkg.priceMonthly > 0 && <React.Fragment>
              <p className='m-0 mt-3 fw-medium display-3'>₪{pkg.priceMonthly}</p>
              <span className='fs-sm text-lowercase text-muted'>/{language("pages.landing.packages.monthly")}</span>
            </React.Fragment>
        }
      </div>

      <Button
        variant={pkg.type === "premium" ? "main-gradient" : "main"}
        className='btn mt-3 mx-3 py-2 rounded-4'
        disabled={!pkg.isActive || pkg.isComingSoon}
        onClick={() => navigateTo(`/subscribe/${pkg.id}`)}
      >
        {language("pages.landing.packages.subscribe")}
      </Button>

      <p className='mt-3 mb-1 fw-medium fs-5'>{servicesNote}</p>

      <ul className='px-2'>
        {pkg.services?.map(service => {
          const text = translateText(currentLanguage, service.arName, service.heName, service.enName);
          return (
            <li key={`package-${pkg.id}-service-${service.id}`} className="my-2 flex-center-y gap-2 fs-6">
              {service.isSpecial ? (
                <FaStar className='text-main' size={18} />
              ) : (
                <BsCheckCircle className='text-main' size={18} />
              )}
              {text}
            </li>
          );
        })}
      </ul>
    </Card>
  )
}

export default PackageLand