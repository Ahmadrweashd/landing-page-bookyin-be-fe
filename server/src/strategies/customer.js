const { CustomerService } = require("../models");

const handleServices = async (customer, services) => {
  if (!Array.isArray(services)) return;

  for (const { name, action } of services) {
    if (!name || !action) continue;
    if (action === "delete") {
      const service = await CustomerService.findByPk(name);
      if (service) await customer.removeCustomerService(service);
    } else if (action === "new") {
      let service = await CustomerService.findByPk(name);
      if (!service) service = await CustomerService.create({ name });
      await customer.addCustomerService(service);
    } else if (action === "add") {
      const service = await CustomerService.findByPk(name);
      if (service) await customer.addCustomerService(service);
    }
  }
};

module.exports = { handleServices };