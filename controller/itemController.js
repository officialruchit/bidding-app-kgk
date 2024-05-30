const Item = require("../model/item");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

exports.getAllItems = async (req, res) => {
  const { page = 1, limit = 10, search, status } = req.query;
  const offset = (page - 1) * limit;
  let where = {};

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  if (status) {
    if (status === "active") {
      where.end_time = { [Op.gt]: new Date() };
    } else if (status === "ended") {
      where.end_time = { [Op.lt]: new Date() };
    }
  }

  try {
    const items = await Item.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json({
      total: items.count,
      items: items.rows,
      currentPage: parseInt(page),
      totalPages: Math.ceil(items.count / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createItem = async (req, res) => {
  const { name, description, starting_price, end_time } = req.body;
  const imageUrl = req.file ? req.file.path : null;
  try {
    const item = await Item.create({
      name,
      description,
      starting_price,
      current_price: starting_price,
      end_time,
      image_url: imageUrl,
    });
    res.status(201).json({ item });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, starting_price, end_time } = req.body;
  const imageUrl = req.file ? req.file.path : null;
  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (req.user.id !== item.userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await item.update({
      name,
      description,
      starting_price,
      current_price: starting_price,
      end_time,
      image_url: imageUrl,
    });

    res.json({ item });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (req.user.id !== item.userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
