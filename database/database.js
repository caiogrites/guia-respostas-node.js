// instalar sequelize -- npm install --save sequelize  --  permite que você manipule o banco de dados com JS
// instalar biblioteca -- npm install --save mysql2
const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas', 'root', '', {
    host:'localhost',
    dialect: 'mysql',
});

module.exports = connection;