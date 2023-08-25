// src/models/Task.js
const Sequelize = require('sequelize');
const db = require('../../../config/databases/sqlite');

const RolesHasPermissions = db.define('roles_has_permissions', {
    role_id: {
        type: Sequelize.INTEGER,
    },
    pemission_id: {
        type: Sequelize.INTEGER,
    }
});

module.exports = RolesHasPermissions;