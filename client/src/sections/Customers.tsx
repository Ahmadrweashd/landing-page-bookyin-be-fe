import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import LandSectionHeader from '../components/LandSectionHeader'
import { getCustomers, getGlobalSettings } from '../api-client';
import { useQuery } from 'react-query';
import LoadingBox from '../components/LoadingBox';
import type { Customer } from '../misc/types';
import CustomerLand from '../components/cards/CustomerLand';
import { range, translateText } from '../misc/helpers';
import { useTranslation } from 'react-i18next';

const Customers = (): React.JSX.Element => {
  const i18next = useTranslation("global")[1]
  const { data, isLoading } = useQuery(
    ['customers'],
    () => getCustomers({ page: 1, limit: 4 })
  );
  const { data: global } = useQuery("settings", getGlobalSettings)

  const currentLanguage = i18next.language
  const title = translateText(currentLanguage, global?.arCustomersTitle, global?.heCustomersTitle, global?.enCustomersTitle)
  const subtitle = translateText(currentLanguage, global?.arCustomersSubtitle, global?.heCustomersSubtitle, global?.enCustomersSubtitle)

  if (!isLoading && (!data || !data.customers || !data.customers.length))
    return <></>

  return (
    <section id='customers' className='bg-gradient-main-background-reverse'>
      <Container>
        <div data-ani="down">
          <LandSectionHeader msg={title} description={subtitle} />
        </div>

        <Row className='flex-center g-5 row-gap-2'>
          {
            isLoading
              ? range(1, 4).map(i =>
                <Col xl={3} md={6} sm={6} xs={12} key={`loading-customer-${i}`}>
                  <LoadingBox className='rounded' width={"100%"} height={120} />
                </Col>
              )
              : data.customers.map((customer: Customer, index: number) =>
                <Col data-ani="bomb" data-delay={Number(`0.${index + 3}`)} xl={3} md={6} xs={12} key={`customer-${customer.id}`}>
                  <CustomerLand customer={customer} />
                </Col>
              )
          }
        </Row>
      </Container>
    </section>
  )
}

export default Customers