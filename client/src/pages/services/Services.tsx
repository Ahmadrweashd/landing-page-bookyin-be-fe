import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getServices } from '../../api-client';
import ServiceCard from '../../components/cards/ServiceDash';
import FloatButton from '../../components/FloatButton';
import NoContent from '../../components/NoContent';
import Button from '../../components/form/Button';
import LoadingBox from '../../components/LoadingBox';
import { range } from '../../misc/helpers';
import type { Service } from '../../misc/types';

const Services = (): React.JSX.Element => {
  const navigateTo = useNavigate();
  const [language, i18next] = useTranslation("global");

  const currentLangue = i18next.language

  const { data, isLoading } = useQuery('services', getServices);

  const handleAdd = () => navigateTo('/create-service');

  if (isLoading) {
    return (
      <main>
        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
          {range(1, 6).map((i) => (
            <Col key={`loading-${i}`}>
              <LoadingBox width="100%" height={110} className="rounded shadow-sm" />
            </Col>
          ))}
        </Row>
      </main>
    );
  }

  if (!data || !data.services || !data.services.length) {
    return (
      <main className="flex-center">
        <NoContent
          msg={language("pages.services.no-services")}
          action={
            <Button
              variant="main"
              className="btn flex-center gap-2"
              onClick={handleAdd}
            >
              <FaPlus /> {language("pages.services.add-service")}
            </Button>
          }
        />
      </main>
    );
  }

  return (
    <main>
      <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
        {data.services.map((service: Service, index: number) => (
          <Col key={`service-${index}`}>
            <ServiceCard service={service} />
          </Col>
        ))}
      </Row>

      <FloatButton right={currentLangue === "en" ? 15 : "auto"} left={currentLangue === "en" ? "auto" : 15} bottom={15} onClick={handleAdd}>
        <FaPlus size={25} />
      </FloatButton>
    </main>
  );
};

export default Services;
