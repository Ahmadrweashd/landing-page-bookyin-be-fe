import React, { useEffect, useCallback, useRef } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useInfiniteQuery } from 'react-query';
import { FiPlus } from 'react-icons/fi';
import CustomerDash from '../../components/cards/CustomerDash';
import { getCustomers } from '../../api-client';
import type { Customer } from '../../misc/types';
import { range } from '../../misc/helpers';
import LoadingBox from '../../components/LoadingBox';
import NoContent from '../../components/NoContent';
import Button from '../../components/form/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FloatButton from '../../components/FloatButton';
import { FaPlus } from 'react-icons/fa';

const Customers = (): React.JSX.Element => {
  const mainRef = useRef<HTMLElement>(null);
  const navigateTo = useNavigate()
  const [language, i18next] = useTranslation("global");

  const currentLangue = i18next.language

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    'customers',
    ({ pageParam = 1 }) => getCustomers({ page: pageParam, limit: 100 }),
    {
      getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    }
  );

  const handleAdd = () => navigateTo('/create-customer');

  const handleScroll = useCallback(() => {
    const el = mainRef.current;
    if (!el || isFetchingNextPage || !hasNextPage) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);


  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  if (isLoading) {
    return (
      <main ref={mainRef}>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {range(1, 8).map(i => (
            <Col key={`loading-box-${i}`}>
              <LoadingBox
                width="100%"
                height={300}
                className="rounded shadow-sm"
              />
            </Col>
          ))}
        </Row>
      </main>
    );
  }

  if (!data?.pages[0]?.customers?.length) {
    return (
      <main className="py-4 flex-center">
        <NoContent
          msg={language("pages.customers.no-customers")}
          action={
            <Button
              variant="main"
              className="btn flex-center gap-2"
              onClick={handleAdd}
            >
              <FiPlus /> {language("pages.customers.addCustomer")}
            </Button>
          }
        />
      </main>
    );
  }

  return (
    <main>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {data.pages.map((page, i) => (
          <React.Fragment key={`page-${i}`}>
            {page.customers.map((customer: Customer) => (
              <Col key={customer.id}>
                <CustomerDash customer={customer} />
              </Col>
            ))}
          </React.Fragment>
        ))}
      </Row>

      {isFetchingNextPage && (
        <div className="text-center mt-4">
          <Spinner
            animation="border"
            variant="primary"
            role="status"
          >
          </Spinner>
        </div>
      )}

      <FloatButton
        right={currentLangue === "en" ? 15 : "auto"} left={currentLangue === "en" ? "auto" : 15}
        bottom={15}
        onClick={handleAdd}
      >
        <FaPlus size={25} />
      </FloatButton>
    </main>
  );
};

export default Customers;