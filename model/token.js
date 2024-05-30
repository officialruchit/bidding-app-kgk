// models/Token.js

const { DataTypes } = require("sequelize");
const db = require("../config");

const Token = db.define(
  "tokens",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "tokens",
    timestamps: false, // Disable automatic timestamps
  }
);

module.exports = Token;
