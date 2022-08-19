const Sequelize = require('sequelize');
const sequelize = new Sequelize( 'monitoringResources', 'root', 'root', {
    dialect: 'sqlite',
    host: 'localhost',
    storage: './database/monitoringResources.sqlite',
    port: 1433
} );

module.exports = sequelize;
