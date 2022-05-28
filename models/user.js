const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define(
  "User", 
  {
    username: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "users",
    // timestamps: false,
    underscored: true,
    paranoid: true
  }
);


module.exports = User;