const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'dapp',
  `${process.env.dbUsername}`,
  `${process.env.password}`,
  {
    dialect: 'mysql',
    host: `${process.env.dbHost}`,
  }
);

module.exports = sequelize;
