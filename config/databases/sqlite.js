const Sequelize = require('sequelize');

module.exports = new Sequelize('sqlite:default.db', {
  dialect: 'sqlite',
  storage: './src/databases/default.db',
});