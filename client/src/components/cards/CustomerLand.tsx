import React, { useEffect, useState } from 'react'
import type { CustomerLandProps } from '../../misc/types'
import { Card } from 'react-bootstrap'
import EmptyProfileImage from "../../assets/images/empty-profile-image.png";
import { useQuery } from 'react-query';
import { getCustomerProfileImage } from '../../api-client';
import LoadingBox from '../LoadingBox';
import { useTranslation } from 'react-i18next';
import { cn } from '../../misc/helpers';
import Button from '../form/Button';

const CustomerLand: React.FC<CustomerLandProps> = ({ customer }): React.ReactNode => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const [language, i18next] = useTranslation("global")

  const currentLanguage = i18next.language

  const {
    data: profileImage,
    isLoading: isLoadingProfile
  } = useQuery(
    ['customerProfile', customer.id],
    () => getCustomerProfileImage(customer.id),
    { enabled: !customer.profileURL }
  );

  useEffect(() => {
    let profileUrl: string | null = null;

    if (profileImage && profileImage instanceof Blob) {
      profileUrl = URL.createObjectURL(profileImage);
      setProfileImageUrl(profileUrl);
    }

    return () => {
      if (profileUrl) URL.revokeObjectURL(profileUrl);
    };
  }, [profileImage]);

  return (
    <div className='customer-wrapper position-relative'>
      <div className={cn(
        currentLanguage === "en",
        "ltr",
        "rtl",
        "overlay d-none d-md-block rounded position-absolute"
      )}>
        <div className="flex-1" />
      </div>

      <Card className="customer-land h-100 border-0 shadow-sm position-relative">
        <Card.Header className="card-header-container border-0 p-0">
          <div className="profile-container">
            {isLoadingProfile ? (
              <LoadingBox className="w-100 h-100" />
            ) : (
              <img
                src={profileImageUrl || EmptyProfileImage}
                alt={customer.name}
                width={75}
                height={75}
                className={cn(
                  currentLanguage !== "en",
                  "rtl",
                  null,
                  "profile-image rounded-circle position-absolute"
                )}
              />
            )}
          </div>
        </Card.Header>

        <Card.Body className="pt-5 text-center">
          <h4 className='fw-semibold text-main'>{customer.businessName}</h4>
          <p className='mb-1 text-muted'>{customer.name}</p>
          {
            customer.evaluation &&
            <p className='mb-1 fst-italic fs-sm text-muted'>{customer.evaluation}</p>
          }

          {
            customer.website &&
            <Button variant='main-outline' className='btn py-1 px-3' onClick={() => window.open(customer.website, '_blank')}>{language("pages.landing.customers.book")}</Button>
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default CustomerLand