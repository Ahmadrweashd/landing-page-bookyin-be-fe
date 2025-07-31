const CustomerServiceModel = (sequelize, DataTypes) => {
  const CustomerService = sequelize.define(
    "CustomerService",
    {
      name: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  CustomerService.associate = (models) => {
    CustomerService.belongsToMany(models.Customer, {
      through: "CustomerServiceLink",
      foreignKey: "serviceName",
      otherKey: "customerId",
      onDelete: "CASCADE",
      timestamps: false
    })
  }

  return CustomerService;
};

module.exports = CustomerServiceModel;