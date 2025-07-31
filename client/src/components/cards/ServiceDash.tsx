import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { cn, translateText } from '../../misc/helpers';
import { useAppContext } from '../../context/AppProvider';
import { deleteService } from '../../api-client';
import type { ServiceCardDashProps } from '../../misc/types';

const ServiceCard: React.FC<ServiceCardDashProps> = ({ service }) => {
  const [language, i18next] = useTranslation('global');
  const currentLang = i18next.language;
  const { showToast, showWarning } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const title = translateText(currentLang, service.arTitle, service.heTitle, service.enTitle);
  const description = translateText(
    currentLang,
    service.arDescription || '',
    service.heDescription || '',
    service.enDescription || ''
  );

  const onEdit = () => {
    navigate(`/modify-service/${service.id}`);
  };

  const deleteMutation = useMutation(() => deleteService(service.id), {
    onSuccess: () => {
      queryClient.invalidateQueries('services');
      showToast({
        message: language('services.messages.delete-success'),
        type: 'SUCCESS',
      });
    },
    onError: () => {
      showToast({
        message: language('services.messages.delete-error'),
        type: 'ERROR',
      });
    },
  });

  const handleDelete = () => {
    showWarning({
      message: `${language('common.are-you-sure-delete')} ${title}?`,
      btn1: language('common.cancel'),
      btn2: language('common.delete'),
      styleBtn1: 'secondary',
      styleBtn2: 'danger',
      handleBtn2: () => deleteMutation.mutate(),
    });
  };

  return (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body>
        <div className="mb-3 flex-center-y justify-content-between">
          {service.icon && (
            <div
              className={`${service.icon} bg-main w-fit p-2 flex-center rounded-circle fs-5 text-white`}
            />
          )}
          <div className="d-flex gap-2">
            <Button size="sm" variant="warning" onClick={onEdit}>
              <FiEdit2 />
            </Button>
            <Button size="sm" variant="danger" onClick={handleDelete}>
              <FiTrash2 />
            </Button>
          </div>
        </div>

        <h5 className="mb-1 fw-bold">{title}</h5>
        {description && (
          <p className="text-muted mt-1 mb-0 small">
            {description}
          </p>
        )}

        <span className={cn(
          currentLang === "en",
          "end-0 pe-1",
          "start-0 ps-1",
          "position-absolute bottom-0 fs-sm text-muted"
        )}>{service.order}</span>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
