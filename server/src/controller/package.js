const { Package, PackageService } = require("../models");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { handlePackageServices } = require("../strategies/package");

const getPackages = catchAsyncErrors(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await Package.findAndCountAll({
    offset,
    limit,
    order: [["id", "DESC"]],
    include: [{ model: PackageService }],
  });

  res.status(200).json({
    packages: rows.map(pkg => ({
      ...pkg.get({ plain: true }),
      services: pkg.PackageServices,
    })),
    total: count,
    page,
    pages: Math.ceil(count / limit),
  });
});

const getPackage = catchAsyncErrors(async (req, res) => {
  const pkg = req.package;
  res.status(200).json({
    package: {
      ...pkg.get({ plain: true }),
      services: pkg.PackageServices,
    }
  });
});

const getActivePackages = catchAsyncErrors(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await Package.findAndCountAll({
    where: { isActive: true },
    offset,
    limit,
    include: [{ model: PackageService }],
    order: [['id', 'ASC']],
  });

  res.status(200).json({
    packages: rows.map(pkg => ({
      ...pkg.get({ plain: true }),
      services: pkg.PackageServices,
    })),
    total: count,
    page,
    pages: Math.ceil(count / limit),
  });
});

const createPackage = catchAsyncErrors(async (req, res) => {
  const { services, ...packageData } = req.body;
  const pkg = await Package.create(packageData);
  await handlePackageServices(pkg, services);
  res.status(201).json({ msg: "Package created", packageId: pkg.id });
});

const updatePackage = catchAsyncErrors(async (req, res) => {
  const { services, ...packageData } = req.body;
  await req.package.update(packageData);
  await handlePackageServices(req.package, services);
  res.status(200).json({ msg: "Package updated", packageId: req.package.id });
});

const deletePackage = catchAsyncErrors(async (req, res) => {
  await req.package.destroy();
  res.status(200).json({ msg: "Package deleted" });
});

module.exports = {
  createPackage,
  getPackages,
  getPackage,
  updatePackage,
  deletePackage,
  getActivePackages
};