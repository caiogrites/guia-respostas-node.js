//model representação da sua tabela em JS
const Sequelize = require("sequelize");
const connection = require ("./database");

const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//passa os dados para o banco
Pergunta.sync({force: false}).then(() => {});
//para exportar o módulo
module.exports = Pergunta;