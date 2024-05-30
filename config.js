const { Sequelize } = require("sequelize");

// Creating Sequelize instance for database connection
const sequelize = new Sequelize("kgk", "postgres", "12345", {
  host: "localhost",
  dialect: "postgres",
});

// Authenticating database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize; // Exporting Sequelize instance for reuse
