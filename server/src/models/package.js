const PackageModel = (sequelize, DataTypes) => {
  const Package = sequelize.define(
    "Package",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      priceMonthly: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      priceYearly: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      arNote: { type: DataTypes.STRING(255), allowNull: true },
      enNote: { type: DataTypes.STRING(255), allowNull: true },
      heNote: { type: DataTypes.STRING(255), allowNull: true },
      arServiceNote: { type: DataTypes.STRING(255), allowNull: true },
      enServiceNote: { type: DataTypes.STRING(255), allowNull: true },
      heServiceNote: { type: DataTypes.STRING(255), allowNull: true },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
      isComingSoon: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
      type: {
        type: DataTypes.ENUM("basic", "premium", "golden"),
        allowNull: false,
        defaultValue: "basic"
      }
    },
    { timestamps: false }
  );

  Package.associate = (models) => {
    Package.hasMany(models.PackageService, {
      foreignKey: "packageId",
      onDelete: "CASCADE"
    });
    Package.hasMany(models.Request, { foreignKey: "packageId" });
  };

  return Package;
};

module.exports = PackageModel;
