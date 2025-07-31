const GlobalModel = (sequelize, DataTypes) => {
  const Global = sequelize.define(
    "Global",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      packagesNumber: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      customersNumber: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      arTitle: { type: DataTypes.STRING(255), allowNull: false, defaultValue: "" },
      enTitle: { type: DataTypes.STRING(255), allowNull: false, defaultValue: "" },
      heTitle: { type: DataTypes.STRING(255), allowNull: false, defaultValue: "" },
      arSubtitle: { type: DataTypes.STRING(255), allowNull: false, defaultValue: "" },
      enSubtitle: { type: DataTypes.STRING(255), allowNull: false, defaultValue: "" },
      heSubtitle: { type: DataTypes.STRING(255), allowNull: false, defaultValue: "" },
      arServicesTitle: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "" },
      enServicesTitle: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "" },
      heServicesTitle: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "" },
      arServicesSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      enServicesSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      heServicesSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      arCustomersTitle: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "" },
      enCustomersTitle: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "" },
      heCustomersTitle: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "" },
      arCustomersSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      enCustomersSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      heCustomersSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      arPackagesTitle: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "" },
      enPackagesTitle: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "" },
      hePackagesTitle: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "" },
      arPackagesSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      enPackagesSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      hePackagesSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      arHeroCustomersTitle: { type: DataTypes.STRING(50), allowNull: true },
      enHeroCustomersTitle: { type: DataTypes.STRING(50), allowNull: true },
      heHeroCustomersTitle: { type: DataTypes.STRING(50), allowNull: true },
      arHeroPackagesTitle: { type: DataTypes.STRING(50), allowNull: true },
      enHeroPackagesTitle: { type: DataTypes.STRING(50), allowNull: true },
      heHeroPackagesTitle: { type: DataTypes.STRING(50), allowNull: true },
      arHeroCustomersSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      enHeroCustomersSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      heHeroCustomersSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      arHeroPackagesSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      enHeroPackagesSubtitle: { type: DataTypes.STRING(50), allowNull: true },
      heHeroPackagesSubtitle: { type: DataTypes.STRING(50), allowNull: true },

    },
    { timestamps: false }
  );

  return Global;
};

module.exports = GlobalModel;