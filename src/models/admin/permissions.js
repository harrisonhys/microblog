// src/models/Task.js
const Sequelize = require('sequelize');
const db = require('../../../config/databases/sqlite');

const Permissions = db.define('permissions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    permission: {
        type: Sequelize.STRING,
    }
},{
    paranoid: true
});

module.exports = Permissions;