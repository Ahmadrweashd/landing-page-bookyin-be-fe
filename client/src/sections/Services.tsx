import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { getGlobalSettings, getServices } from '../api-client';
import { useQuery } from 'react-query';
import { range, translateText } from '../misc/helpers';
import LoadingBox from '../components/LoadingBox';
import type { Service } from '../misc/types';
import ServiceLand from '../components/cards/ServiceLand';
import LandSectionHeader from '../components/LandSectionHeader';
import { useTranslation } from 'react-i18next';

const Services = (): React.JSX.Element => {
  const { data, isLoading } = useQuery('services', getServices);
  const { data: global } = useQuery('settings', getGlobalSettings);
  const i18next = useTranslation("global")[1]

  const currentLanguage = i18next.language
  const title = translateText(currentLanguage, global?.arServicesTitle, global?.heServicesTitle, global?.enServicesTitle)
  const subtitle = translateText(currentLanguage, global?.arServicesSubtitle, global?.heServicesSubtitle, global?.enServicesSubtitle)

  if (!isLoading && (!data || !data.services || !data.services.length))
    return <></>

  return (
    <section className='services bg-background' id='services'>
      <Container>
        <div data-ani="down">
          <LandSectionHeader msg={title} description={subtitle} />
        </div>

        <Row className='flex-center g-4'>
          {
            isLoading
              ? range(1, 5).map(i =>
                <Col lg={3} md={4} sm={6} xs={12} key={`loading-service-${i}`}>
                  <LoadingBox className='rounded' width={"100%"} height={75} />
                </Col>
              )
              : data.services.map((service: Service, index: number) =>
                <Col
                  data-ani="down"
                  data-delay={Number(`0.${index + 3}`)}
                  lg={3} md={4} sm={6} xs={12} key={`service-${service.id}`}
                >
                  <ServiceLand service={service} />
                </Col>
              )
          }
        </Row>
      </Container>
    </section>
  )
}

export default Services