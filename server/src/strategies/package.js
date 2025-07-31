const { PackageService } = require("../models");

const handlePackageServices = async (packageInstance, services) => {
  await PackageService.destroy({ where: { packageId: packageInstance.id } });

  if (Array.isArray(services)) {
    for (const service of services) {
      await PackageService.create({ ...service, packageId: packageInstance.id });
    }
  }
};

module.exports = { handlePackageServices };