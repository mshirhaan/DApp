const sequelize = require('../util/database');

const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: Sequelize.STRING,
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  duroodCount: Sequelize.INTEGER,
});

module.exports = User;
