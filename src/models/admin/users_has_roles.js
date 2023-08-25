// src/models/Task.js
const Sequelize = require('sequelize');
const db = require('../../../config/databases/sqlite');

const UsersHasRoles = db.define('users_has_roles', {
    role_id: {
        type: Sequelize.INTEGER,
    },
    pemission_id: {
        type: Sequelize.INTEGER,
    }
});

module.exports = UsersHasRoles;