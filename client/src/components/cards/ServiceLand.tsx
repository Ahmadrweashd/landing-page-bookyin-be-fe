import React from 'react'
import type { ServiceCardLandProps } from '../../misc/types'
import { translateText } from '../../misc/helpers';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';

const ServiceLand: React.FC<ServiceCardLandProps> = ({ service }): React.ReactNode => {
  const i18next = useTranslation("global")[1]

  const currentLang = i18next.language
  const title = translateText(currentLang, service.arTitle, service.heTitle, service.enTitle);
  const description = translateText(
    currentLang,
    service.arDescription || '',
    service.heDescription || '',
    service.enDescription || ''
  );

  return (
    <Card className="service-land border-0 shadow-sm transition-03">
      <Card.Body>
        <div className="mb-3 flex-center-y justify-content-between">
          {service.icon && (
            <div
              className={`${service.icon} bg-main w-fit p-2 flex-center rounded-circle fs-5 text-white`}
            />
          )}
        </div>

        <h5 className="mb-1 fw-bold">{title}</h5>
        {description && (
          <p className="text-muted mt-1 mb-0 small">
            {description}
          </p>
        )}
      </Card.Body>
    </Card>
  )
}

export default ServiceLand