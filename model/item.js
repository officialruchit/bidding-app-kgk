const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Item = sequelize.define('items', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  starting_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  current_price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: DataTypes.DECIMAL(10, 2),
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
},{
    tableName: 'items',
    timestamps: false, // Disable automatic timestamps
  }
);

module.exports = Item;
