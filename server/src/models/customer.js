const fs = require("fs");
const path = require("path");

const CustomerModel = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      backgroundImageURL: { type: DataTypes.STRING(255), allowNull: true },
      profileURL: { type: DataTypes.STRING(255), allowNull: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
      location: { type: DataTypes.STRING(255), allowNull: true },
      evaluation: { type: DataTypes.STRING(255), allowNull: true },
      phone: { type: DataTypes.STRING(50), allowNull: false },
      website: { type: DataTypes.STRING(255), allowNull: true },
      isSpecial: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
      businessName: { type: DataTypes.STRING(100), allowNull: false, unique: true, index: true }
    },
    {
      timestamps: false,
      indexes: [{ unique: true, fields: ['businessName'] }],
      hooks: {
        beforeDestroy: async (customer) => {
          const removeFile = (filePath) => {
            if (filePath) {
              const absPath = path.resolve(
                process.cwd(),
                "uploads",
                filePath.replace(/^\/?uploads[\\/]/, '')
              )
              if (fs.existsSync(absPath)) fs.unlinkSync(absPath);
            }
          };
          removeFile(customer.profileURL);
          removeFile(customer.backgroundImageURL);
        },
      },
    }
  );

  Customer.associate = (models) => {
    Customer.belongsToMany(models.CustomerService, {
      through: "CustomerServiceLink",
      foreignKey: "customerId",
      otherKey: "serviceName",
      onDelete: "CASCADE",
      timestamps: false
    })
  }

  return Customer;
}

module.exports = CustomerModel;