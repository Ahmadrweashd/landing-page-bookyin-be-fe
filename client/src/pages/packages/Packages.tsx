import React, { useEffect, useCallback, useRef } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useInfiniteQuery } from 'react-query';
import { FaPlus } from 'react-icons/fa';
import PackageDash from '../../components/cards/PackageDash';
import { getPackages } from '../../api-client';
import type { Package } from '../../misc/types';
import LoadingBox from '../../components/LoadingBox';
import NoContent from '../../components/NoContent';
import Button from '../../components/form/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FloatButton from '../../components/FloatButton';
import { range } from '../../misc/helpers';

const Packages = (): React.JSX.Element => {
  const mainRef = useRef<HTMLElement>(null);
  const navigateTo = useNavigate();
  const [language, i18next] = useTranslation("global");

  const currentLangue = i18next.language

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    'packages',
    ({ pageParam = 1 }) => getPackages({ page: pageParam, limit: 100 }),
    {
      getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    }
  );

  const handleAdd = () => navigateTo('/create-package');

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
        <Row xs={1} sm={1} md={2} xl={3} className="g-4">
          {range(1, 6).map((i) => (
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

  if (!data?.pages[0]?.packages?.length) {
    return (
      <main className="py-4 flex-center">
        <NoContent
          msg={language("pages.packages.no-packages")}
          action={
            <Button
              variant="main"
              className="btn flex-center gap-2"
              onClick={handleAdd}
            >
              <FaPlus /> {language("pages.packages.add-package")}
            </Button>
          }
        />
      </main>
    );
  }

  return (
    <main ref={mainRef}>
      <Row xs={1} sm={1} md={2} xl={3} className="g-4">
        {data.pages.map((page, i) => (
          <React.Fragment key={`page-${i}`}>
            {page.packages.map((pkg: Package) => (
              <Col key={pkg.id}>
                <PackageDash package={pkg} />
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
          />
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

export default Packages;
