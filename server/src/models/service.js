const ServiceModel = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      arTitle: { type: DataTypes.STRING(255), allowNull: false },
      heTitle: { type: DataTypes.STRING(255), allowNull: false },
      enTitle: { type: DataTypes.STRING(255), allowNull: false },
      arDescription: { type: DataTypes.TEXT, allowNull: true },
      heDescription: { type: DataTypes.TEXT, allowNull: true },
      enDescription: { type: DataTypes.TEXT, allowNull: true },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      icon: { type: DataTypes.STRING(255), allowNull: true },
    },
    { timestamps: false }
  );

  return Service;
};

module.exports = ServiceModel;
