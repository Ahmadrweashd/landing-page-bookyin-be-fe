import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from '../form/Button';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { getCustomersServices } from '../../api-client';
import type { CustomersServices, ServicesSectionProps } from '../../misc/types';
import LoadingBox from '../LoadingBox';
import { range } from '../../misc/helpers';

const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServices,
  setSelectedServices
}): React.ReactNode => {
  const { t: language } = useTranslation('global');

  const { data: servicesData = [], isLoading: loadingServices } = useQuery(
    'customer-services',
    getCustomersServices
  );

  const [newServiceInput, setNewServiceInput] = useState('');

  const isServiceSelected = (name: string): boolean => {
    return selectedServices.some(
      (s) => s.name === name && (s.action === 'add' || s.action === 'new')
    );
  };

  const isDuplicate = (name: string): boolean => {
    if (!servicesData || !servicesData.services || !servicesData.services.length) return false;
    if (!name.trim()) return true;
    const lower = name.toLowerCase();
    return (
      servicesData.services.some((s: CustomersServices) => s.name.toLowerCase() === lower) ||
      selectedServices.some((s: CustomersServices) => s.name.toLowerCase() === lower)
    );
  };

  const toggleService = (name: string): void => {
    setSelectedServices((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((s) => s.name === name);

      if (index !== -1) {
        const service = updated[index];
        if (service.action === 'add') {
          updated.splice(index, 1);
          if (!updated.some((s) => s.name === name && s.action === 'delete')) {
            updated.push({ name, action: 'delete' });
          }
        } else if (service.action === 'delete') {
          updated.splice(index, 1);
          if (!updated.some((s) => s.name === name && s.action === 'add')) {
            updated.push({ name, action: 'add' });
          }
        } else if (service.action === 'new') {
          updated.splice(index, 1);
        }
      } else {
        const cleaned = updated.filter((s) => s.name !== name);
        cleaned.push({ name, action: 'add' });
        return cleaned;
      }

      return updated;
    });
  };

  const handleAddNewService = () => {
    if (!newServiceInput.trim()) return;
    const name = newServiceInput.trim();

    setSelectedServices((prev) => {
      const filtered = prev.filter((s) => s.name !== name);
      return [...filtered, { name, action: 'new' }];
    });

    setNewServiceInput('');
  };

  const filteredServices: CustomersServices[] = (servicesData && servicesData.services && servicesData.services.length > 0) ? servicesData.services.filter(
    (service: CustomersServices) => {
      const s = service.name.toLowerCase().includes(newServiceInput.toLowerCase()) &&
        !isServiceSelected(service.name)
      return s
    }
  ) : []

  return (
    <section id='services-section' className="services-section">
      <h5 className="mb-3">{language('pages.customers.form.labels.services-title')}:</h5>

      <div className="selected-services-window mb-3 p-3 d-flex align-items-start flex-wrap border rounded gap-1 overflow-y-auto">
        {selectedServices
          .filter((s) => s.action === 'add' || s.action === 'new')
          .map((service) => (
            <div
              key={`selected-${service.name}`}
              className="badge-selected-services badge bg-main px-4 py-1 rounded-pill fs-sm text-white pointer transition-03"
              onClick={() => toggleService(service.name)}
            >
              {service.name}
            </div>
          ))}
      </div>

      <div className="border rounded p-3">
        <div className="input-group mb-3">
          <Form.Control
            type="text"
            placeholder={language('pages.customers.form.labels.add-service')}
            value={newServiceInput}
            onChange={(e) => setNewServiceInput(e.target.value)}
          />
          <Button
            variant="main-outline"
            type="button"
            className='btn'
            onClick={handleAddNewService}
            disabled={!newServiceInput.trim() || isDuplicate(newServiceInput)}
          >
            {language('common.add')}
          </Button>
        </div>


        <div className='filtered-services-window d-flex align-items-start flex-wrap gap-1 overflow-y-auto'>
          {
            loadingServices
              ? <React.Fragment>
                {
                  range(1, 8).map(i => (
                    <LoadingBox key={`loading-services-${i}`} width={65} height={20} className='rounded-pill' />
                  ))
                }
              </React.Fragment>
              : <React.Fragment>
                {filteredServices && filteredServices.length > 0 && filteredServices.map((service: CustomersServices) => (
                  <div
                    key={`services-${service.name}`}
                    className="badge-filtered-services badge px-4 py-1 rounded-pill fs-sm text-white pointer transition-03"
                    onClick={() => toggleService(service.name)}
                  >
                    {service.name}
                  </div>
                ))}</React.Fragment>
          }
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
