const Sequelize = require('sequelize')
const db = require('../db')

const PermissionRel = db.define('permissionRel', {})

module.exports = PermissionRel;
