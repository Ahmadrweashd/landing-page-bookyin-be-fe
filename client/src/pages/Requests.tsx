import React, { useEffect, useCallback, useRef } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { useInfiniteQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { getRequests } from "../api-client";
import LoadingBox from "../components/LoadingBox";
import { range } from "../misc/helpers";
import NoContent from "../components/NoContent";
import RequestDash from "../components/cards/RequestDash";
import type { Request } from "../misc/types";

const Requests = (): React.JSX.Element => {
  const mainRef = useRef<HTMLElement>(null);
  const [language] = useTranslation("global");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    "requests",
    ({ pageParam = 1 }) => getRequests({ page: pageParam, limit: 100 }),
    {
      getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
    }
  );

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

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading) {
    return (
      <main ref={mainRef}>
        <Row xs={1} sm={1} md={2} xl={3} className="g-4">
          {range(1, 6).map((i) => (
            <Col key={`loading-box-${i}`}>
              <LoadingBox width="100%" height={300} className="rounded shadow-sm" />
            </Col>
          ))}
        </Row>
      </main>
    );
  }

  if (!data?.pages[0]?.requests?.length) {
    return (
      <main className="py-4 flex-center">
        <NoContent
          msg={language("pages.requests.no-requests")}
        />
      </main>
    );
  }

  return (
    <main ref={mainRef} id="dash-requests">
      <Row xs={1} sm={1} md={2} xl={3} className="g-4">
        {data.pages.map((page, i) => (
          <React.Fragment key={`page-${i}`}>
            {page.requests.map((request: Request) => (
              <Col key={request.id}>
                <RequestDash request={request} />
              </Col>
            ))}
          </React.Fragment>
        ))}
      </Row>

      {isFetchingNextPage && (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" role="status" />
        </div>
      )}
    </main>
  );
};

export default Requests;
