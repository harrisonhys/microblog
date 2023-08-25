// src/models/Task.js
const Sequelize = require('sequelize');
const db = require('../../../config/databases/sqlite');

const Roles = db.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role: {
        type: Sequelize.STRING,
    }
},{
    paranoid: true
});

module.exports = Roles;