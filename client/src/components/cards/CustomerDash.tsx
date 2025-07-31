import { Button, Card } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiStar, FiMapPin, FiGlobe } from 'react-icons/fi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteCustomer, getCustomerProfileImage, getCustomerBackgroundImage } from '../../api-client';
import { useAppContext } from '../../context/AppProvider';
import LoadingBox from '../LoadingBox';
import type { CustomerDashProps } from '../../misc/types';
import EmptyBackgroundImage from "../../assets/images/empty-background-image.png";
import EmptyProfileImage from "../../assets/images/empty-profile-image.png";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CustomerDash: React.FC<CustomerDashProps> = ({ customer }): React.JSX.Element => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(null);
  const { t: language } = useTranslation("global");

  const { showWarning, showToast } = useAppContext();
  const navigateTo = useNavigate()
  const queryClient = useQueryClient();

  const {
    data: profileImage,
    isLoading: isLoadingProfile
  } = useQuery(
    ['customerProfile', customer.id],
    () => getCustomerProfileImage(customer.id),
    { enabled: !customer.profileURL }
  );

  const {
    data: backgroundImage,
    isLoading: isLoadingBackground
  } = useQuery(
    ['customerBackground', customer.id],
    () => getCustomerBackgroundImage(customer.id),
    { enabled: !customer.backgroundImageURL }
  );

  const onEdit = () => navigateTo(`/modify-customer/${customer.id}`);

  const deleteMutation = useMutation(() => deleteCustomer(customer.id), {
    onSuccess: () => {
      queryClient.invalidateQueries('customers');
      showToast({
        message: language("customers.messages-delete-success"),
        type: "SUCCESS"
      });
    },
    onError: () => {
      showToast({
        message: language("customers.messages-delete-error"),
        type: "ERROR"
      });
    }
  });

  const handleDelete = () => {
    showWarning({
      message: `${language('common.are-you-sure-delete')} ${customer.name}?`,
      btn1: language("common.cancel"),
      btn2: language("common.delete"),
      styleBtn1: "secondary",
      styleBtn2: "danger",
      handleBtn2: () => deleteMutation.mutate()
    });
  };

  useEffect(() => {
    let profileUrl: string | null = null;
    let backgroundUrl: string | null = null;

    if (profileImage && profileImage instanceof Blob) {
      profileUrl = URL.createObjectURL(profileImage);
      setProfileImageUrl(profileUrl);
    }

    if (backgroundImage && backgroundImage instanceof Blob) {
      backgroundUrl = URL.createObjectURL(backgroundImage);
      setBackgroundImageUrl(backgroundUrl);
    }

    return () => {
      if (profileUrl) URL.revokeObjectURL(profileUrl);
      if (backgroundUrl) URL.revokeObjectURL(backgroundUrl);
    };
  }, [profileImage, backgroundImage]);

  return (
    <Card className="customer-dash">
      <Card.Header className="card-header-container p-0">
        {isLoadingBackground ? (
          <LoadingBox height={120} className="w-100" />
        ) : (
          <Card.Img
            variant="top"
            src={backgroundImageUrl || EmptyBackgroundImage}
            className="background-image"
            alt={customer.businessName}
          />
        )}
        <div className="profile-container">
          {isLoadingProfile ? (
            <LoadingBox className="w-100 h-100" />
          ) : (
            <img
              src={profileImageUrl || EmptyProfileImage}
              alt={customer.name}
              className="profile-image"
            />
          )}
        </div>
      </Card.Header>

      <Card.Body className="pt-5">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <Card.Title className="mb-0 d-flex align-items-center gap-2">
              {customer.name}
              {customer.isSpecial && <FiStar className="text-warning" />}
            </Card.Title>
            <Card.Subtitle className="text-muted">
              {customer.businessName}
            </Card.Subtitle>
          </div>
          <div className="action-buttons">
            <Button variant='warning' size='sm'>
              <FiEdit2 onClick={onEdit} />
            </Button>

            <Button variant='danger' size='sm'>
              <FiTrash2 onClick={handleDelete} />
            </Button>

          </div>
        </div>

        {customer.location && (
          <Card.Text className="text-muted mb-2">📍 {customer.location}</Card.Text>
        )}

        {customer.evaluation && (
          <Card.Text className="fst-italic text-muted mb-2">{customer.evaluation}</Card.Text>
        )}

        <div className="social-links d-flex flex-wrap gap-2 mt-3">
          {customer.location && (
            <div className="icon-badge secondary transition-03 pointer" title={customer.location}>
              <FiMapPin size={16} />
            </div>
          )}

          {customer.website && (
            <a
              href={customer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-badge info transition-03"
              title="Website"
            >
              <FiGlobe size={16} />
            </a>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomerDash;
