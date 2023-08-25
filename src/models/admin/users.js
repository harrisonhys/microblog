// src/models/Task.js
const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../../config/databases/sqlite');
const argon2 = require('argon2');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
        validate: {
          notEmpty: true,
          isEmail: true,
        },
    },
    email_verified_at: {
        type: DataTypes.DATE,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
    },
    password: {
        type: Sequelize.STRING,
    },
    last_change_password: {
        type: DataTypes.DATE,
    },
    resetToken : {
        type: Sequelize.STRING,
    },
    last_login: {
        type: Sequelize.STRING,
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
},{
    paranoid: true
});

Users.beforeCreate(async (user) => {
    user.password = await argon2.hash(user.password);
});
  
Users.prototype.checkPassword = async function (password) {
    return await argon2.verify(this.password, password);
};

module.exports = Users;