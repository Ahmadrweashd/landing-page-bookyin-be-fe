const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
      username: { type: DataTypes.STRING(25), allowNull: false, },
      password: { type: DataTypes.STRING(255), allowNull: false, },
      phone: { type: DataTypes.STRING(50), allowNull: false, },
      whatsapp: { type: DataTypes.STRING(50), allowNull: true, },
      instagram: { type: DataTypes.STRING(255), allowNull: true, },
      tiktok: { type: DataTypes.STRING(255), allowNull: true, },
      youtube: { type: DataTypes.STRING(255), allowNull: true, },
      email: { type: DataTypes.STRING(50), allowNull: true, },
      location: { type: DataTypes.STRING(255), allowNull: true, },
      mobileNumber: { type: DataTypes.STRING(50), allowNull: true, },
    },
    {
      timestamps: false
    }
  );

  return User;
}

module.exports = UserModel;
