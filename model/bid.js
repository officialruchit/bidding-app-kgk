const { DataTypes } = require("sequelize");
const sequelize = require("../config");
const User = require("./user");
const Item = require("./item");

const Bid = sequelize.define(
  "bids",
  {
    bid_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

// Associations
Bid.belongsTo(User, { foreignKey: "user_id" });
Bid.belongsTo(Item, { foreignKey: "item_id" });

module.exports = Bid;
