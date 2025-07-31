const ContactModel = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      message: { type: DataTypes.TEXT, allowNull: false },
      phone: { type: DataTypes.STRING(50), allowNull: false },
      name: { type: DataTypes.STRING(100), allowNull: false },
      isRead: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    },
    { timestamps: true }
  );

  return Contact;
};

module.exports = ContactModel;