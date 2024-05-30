const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false, // Disable automatic timestamps
  }
);

module.exports = User;
