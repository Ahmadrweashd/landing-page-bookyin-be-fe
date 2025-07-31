import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import {
  FaPhone,
  FaUser,
  FaBriefcase,
  FaGift,
  FaUserPlus
} from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../context/AppProvider";
import { deleteRequest, convertRequestToCustomer } from "../../api-client";
import type { RequestDashProps } from "../../misc/types";

const RequestDash: React.FC<RequestDashProps> = ({ request }) => {
  const [language] = useTranslation("global");
  const { showToast, showWarning } = useAppContext();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(() => deleteRequest(request.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("requests");
      showToast({
        message: language("pages.requests.delete-success"),
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: language("pages.requests.delete-error"),
        type: "ERROR",
      });
    },
  });

  const handleDelete = () => {
    showWarning({
      message: `${language("common.are-you-sure-delete")} ${request.name}?`,
      btn1: language("common.cancel"),
      btn2: language("common.delete"),
      styleBtn1: "secondary",
      styleBtn2: "danger",
      handleBtn2: () => deleteMutation.mutate(),
    });
  };

  const convertMutation = useMutation(() => convertRequestToCustomer(request.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("requests");
      showToast({
        message: language("pages.requests.convert-success"),
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: language("pages.requests.convert-error"),
        type: "ERROR",
      });
    },
  });

  const handleConvert = () => {
    showWarning({
      message: `${language("pages.requests.convert-warning")} ${request.name}?`,
      btn1: language("common.cancel"),
      btn2: language("pages.requests.convert"),
      styleBtn1: "secondary",
      styleBtn2: "warning",
      handleBtn2: () => convertMutation.mutate(),
    });
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 d-flex align-items-center gap-2">
            <FaUser /> {request.name}
          </h5>
        </div>
        <div className="d-flex gap-2">
          <Button size="sm" variant="success" onClick={handleConvert} title={language("pages.requests.convert")}>
            <FaUserPlus />
          </Button>
          <Button size="sm" variant="danger" onClick={handleDelete}>
            <FiTrash2 />
          </Button>
        </div>
      </Card.Header>

      <Card.Body>
        <div className="mb-2 d-flex align-items-center gap-2">
          <FaPhone className="text-muted" />
          <span>{request.phone}</span>
        </div>
        <div className="mb-2 d-flex align-items-center gap-2">
          <FaBriefcase className="text-muted" />
          <span>{request.businessName}</span>
        </div>

        {request.packageType && (
          <div className="mb-2 d-flex align-items-center gap-2">
            <FaGift className="text-muted" />
            <Badge bg="info">{language(`pages.requests.types.${request.packageType}`)}</Badge>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default RequestDash;
