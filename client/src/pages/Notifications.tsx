import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { deleteMessage, getMessages } from "../api-client";
import type { Message } from "../misc/types";
import { BiTrash, BiArrowBack } from "react-icons/bi";
import { useAppContext } from "../context/AppProvider";
import LoadingBox from "../components/LoadingBox";
import { range } from "../misc/helpers";

const Notifications = (): React.JSX.Element => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { t: language } = useTranslation("global");
  const { showToast, showWarning } = useAppContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { data: messages = [], isLoading } = useQuery<Message[]>("notifications", async () => {
    const { contacts } = await getMessages({ page: 1, limit: 200 });
    return contacts;
  });

  const deleteMutation = useMutation((id: number) => deleteMessage(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("notifications");
      showToast({
        message: language("pages.requests.delete-success"),
        type: "SUCCESS",
      });
      setSelectedMessage(null);
    },
    onError: () => {
      showToast({
        message: language("pages.requests.delete-error"),
        type: "ERROR",
      });
    },
  });

  const handleDelete = (id: number, name: string) => {
    showWarning({
      message: `${language("common.are-you-sure-delete")} ${name}?`,
      btn1: language("common.cancel"),
      btn2: language("common.delete"),
      styleBtn1: "secondary",
      styleBtn2: "danger",
      handleBtn2: () => deleteMutation.mutate(id),
    });
  };

  if (isLoading) {
    return (
      <main>
        {range(1, 5).map(i => (
          <LoadingBox key={`loading-${i}`} className="mx-2 mb-3" width={"95%"} height={50} />
        ))}
      </main>
    );
  }

  const showMessageList = !selectedMessage || !isMobile;

  return (
    <main id="notifications-wrapper" className="notifications-wrapper p-0">
      <Row className="g-0">
        {showMessageList && (
          <Col xs={12} md={5} lg={4} className="msgs-container border">
            {messages.map(message => (
              <div
                onClick={() => setSelectedMessage(message)}
                key={message.id}
                className="card-message p-2 py-1 border-bottom pointer"
              >
                <div className="flex-center-y gap-2">
                  <div className="profile flex-center rounded-circle fs-4">{message.message ? message.message[0] : "U"}</div>
                  <p className="m-0">{message.message}</p>
                </div>
                <p className="msg m-0 mt-1">{message.message}</p>
              </div>
            ))}
          </Col>
        )}

        {selectedMessage && (
          <Col xs={12} md={7} lg={8} className="msg-container p-3">
            <div className="message-details">
              {isMobile && (
                <Button
                  variant="light"
                  className="mb-3"
                  onClick={() => setSelectedMessage(null)}
                >
                  <BiArrowBack className="me-1" />
                  {language("common.back")}
                </Button>
              )}
              <Button
                onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                variant="danger"
              >
                <BiTrash />
              </Button>
              <hr />
              <p className="flex-center-y gap-2">
                <strong>{language("notifications.info.name")}:</strong> {selectedMessage.name}
              </p>
              <p className="flex-center-y gap-2">
                <strong>{language("notifications.info.phone")}:</strong> {selectedMessage.phone}
              </p>
              <div className="bg-light p-3 rounded" style={{ whiteSpace: "pre-wrap" }}>
                {selectedMessage.message}
              </div>
            </div>
          </Col>
        )}
      </Row>
    </main>
  );
};

export default Notifications;
