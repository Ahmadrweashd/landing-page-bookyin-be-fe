const PackageServiceModel = (sequelize, DataTypes) => {
  const PackageService = sequelize.define(
    "PackageService",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      arName: { type: DataTypes.STRING(100), allowNull: false },
      enName: { type: DataTypes.STRING(100), allowNull: false },
      heName: { type: DataTypes.STRING(100), allowNull: false },
      isSpecial: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true },
      packageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Packages", key: "id" }
      }
    },
    { timestamps: false }
  );

  PackageService.associate = (models) => {
    PackageService.belongsTo(models.Package, {
      foreignKey: "packageId",
      onDelete: "CASCADE"
    });
  };

  return PackageService;
};

module.exports = PackageServiceModel;
