const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cc_db", "root", "Wutwut01", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

module.exports = sequelize;


