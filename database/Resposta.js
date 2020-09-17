//model representação da sua tabela em JS
const Sequelize = require("sequelize");
const connection = require ("./database");

const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false          //allownull false tem que ser sempre preenchido
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
//passa os dados para o banco
Resposta.sync({force: false}).then(() => {});   //force para não criar a tabela caso ela ja exista
//para exportar o módulo
module.exports = Resposta;