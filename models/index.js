'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')[process.env.NODE_ENV || 'development'];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const UserModel = require('../src/modules/user/user.model');
const MessageModel = require('../src/modules/message/message.model');

const User = UserModel(sequelize, Sequelize.DataTypes);
const Message = MessageModel(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Message = Message;

Object.values(db).forEach(model => {
    if (typeof model.associate === 'function') {
        model.associate(db);
    }
});

module.exports = db;
