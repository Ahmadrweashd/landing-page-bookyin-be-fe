const RequestModel = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    "Request",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
      phone: { type: DataTypes.STRING(50), allowNull: false },
      businessName: { type: DataTypes.STRING(100), allowNull: false },
      packageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Packages", key: "id" }
      }
    },
    { timestamps: false }
  );

  Request.associate = (models) => {
    Request.belongsTo(models.Package, { foreignKey: "packageId" });
  };

  return Request;
};

module.exports = RequestModel;