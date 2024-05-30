const { DataTypes } = require("sequelize");
const sequelize = require("../config");
const User = require("./user");

const Notification = sequelize.define(
  "notifications",
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // Disable automatic timestamps
  }
);

// Associations
Notification.belongsTo(User, { foreignKey: "user_id" });

module.exports = Notification;
