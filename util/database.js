const Sequelize = require('sequelize');

const sequelize = new Sequelize('dapp', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
