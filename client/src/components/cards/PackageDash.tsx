import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import {
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaTrash,
  FaStar,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { deletePackage } from '../../api-client';
import { useAppContext } from '../../context/AppProvider';
import { useTranslation } from 'react-i18next';
import type { PackageDashProps, PackageService } from '../../misc/types';
import { cn, translateText } from '../../misc/helpers';

const PackageDash: React.FC<PackageDashProps> = ({ package: pkg }): React.ReactNode => {
  const navigateTo = useNavigate();
  const queryClient = useQueryClient();
  const { showWarning, showToast } = useAppContext();
  const [language, i18next] = useTranslation("global");
  const currentLanguage = i18next.language

  const note = translateText(currentLanguage, pkg.arNote, pkg.heNote, pkg.enNote)
  const noteService = translateText(currentLanguage, pkg.arServiceNote, pkg.heServiceNote, pkg.enServiceNote)

  const onEdit = () => navigateTo(`/modify-package/${pkg.id}`);

  const deleteMutation = useMutation(() => deletePackage(pkg.id), {
    onSuccess: () => {
      queryClient.invalidateQueries('packages');
      showToast({
        message: language('pages.packages.messages.delete-success'),
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: language('pages.packages.messages.delete-error'),
        type: "ERROR",
      });
    },
  });

  const handleDelete = () => {
    showWarning({
      message: `${language('common.are-you-sure-delete')}?`,
      btn1: language('pages.packages.common.cancel'),
      btn2: language('pages.packages.common.delete'),
      styleBtn1: "secondary",
      styleBtn2: "danger",
      handleBtn2: () => deleteMutation.mutate(),
    });
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'basic': return 'secondary';
      case 'premium': return 'primary';
      case 'golden': return 'warning';
      default: return 'light';
    }
  };

  const getTypeIcon = (type: string): React.ReactNode => {
    if (type === 'premium' || type === 'exclusive') {
      return <FaStar className="me-1" />;
    }
    return null;
  };

  return (
    <Card className={cn(
      pkg.isComingSoon,
      "package-dash-coming-soon",
      null,
      `package-dash h-100 border-0 shadow-sm`
    )}>
      {pkg.isComingSoon && (
        <div className="position-absolute top-0 end-0 z-10">
          <Badge bg="warning" text="dark" className="px-3 py-2">
            <FaClock className="me-1" />
          </Badge>
        </div>
      )}

      <Card.Header className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3">
        <div className="flex-grow-1">
          <div className="d-flex flex-wrap gap-2 mb-2">
            <h5 className="mb-0 d-flex align-items-center gap-2">
              <Badge
                bg={getTypeBadgeColor(pkg.type)}
                className="text-uppercase d-flex align-items-center"
              >
                {getTypeIcon(pkg.type)}
                {language(`pages.packages.types.${pkg.type}`)}
              </Badge>

              {pkg.isActive ? (
                <Badge bg="success" className="d-flex align-items-center">
                  <FaCheckCircle className="me-1" size={12} />
                  {language('pages.packages.status.active')}
                </Badge>
              ) : (
                <Badge bg="secondary">
                  {language('pages.packages.status.inactive')}
                </Badge>
              )}
            </h5>
          </div>
        </div>

        <div className="d-flex gap-2 pt-lg-4">
          <Button
            variant="warning"
            size="sm"
            onClick={onEdit}
            aria-label={language('pages.packages.actions.edit', { id: pkg.id })}
          >
            <FaEdit />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
            aria-label={language('pages.packages.actions.delete', { id: pkg.id })}
          >
            <FaTrash />
          </Button>
        </div>
      </Card.Header>

      <Card.Body>
        <div className="d-flex align-items-center gap-0 mb-3">
          <span className='fs-5'>₪</span>
          <span className="fw-bold fs-5">{pkg.priceMonthly}</span>
          <small className="text-muted">/{language("pages.packages.month")}</small>
        </div>
        <div className="d-flex align-items-center gap-0 mb-3">
          <span className='fs-5'>₪</span>
          <span className="fw-bold fs-5">{pkg.priceYearly}</span>
          <small className="text-muted">/{language("pages.packages.year")}</small>
        </div>

        {note && (
          <div className="alert alert-light border-0 py-2 px-3 mb-3">
            <small className="text-muted fst-italic">{note}</small>
          </div>
        )}

        {noteService && (
          <div className="mb-3">
            <strong>{language('pages.packages.services-note')}:</strong>
            <p className="mb-0 mt-1">{noteService}</p>
          </div>
        )}

        <div>
          <h6 className="mb-2 d-flex align-items-center gap-2">
            <FaCheckCircle className="text-success" />
            {language('pages.packages.included-services')}:
          </h6>
          <ul className="list-unstyled ms-3">
            {pkg.services.map((service: Partial<PackageService>) => {
              const serviceName = translateText(currentLanguage, service.arName, service.heName, service.enName);

              return (
                <li key={service.id ?? serviceName} className="d-flex align-items-center gap-2">
                  {service.isSpecial ? (
                    <FaStar className="text-warning" size={14} />
                  ) : (
                    <FaCheckCircle className="text-main" size={14} />
                  )}
                  {serviceName}
                </li>
              );
            })}
          </ul>
        </div>


      </Card.Body>
    </Card>
  );
};

export default PackageDash;
