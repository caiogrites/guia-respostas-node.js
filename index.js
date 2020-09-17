const express = require("express"); //importa o express js
const app = express();
const bodyParser = require("body-parser");  // instalar npm install body-parser --save  responsavel em traduzir os dados enviado pelo formulario em uma estrutura JS 
const connection = require("./database/database"); //conectar banco
const Pergunta = require ("./database/Pergunta"); // cria tabela e colunas dentro do banco de dados
const Resposta = require ("./database/Resposta"); // Model resposta
// conexão com banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!")
    })
    .catch((msgErro) =>  {
        console.log(msgErro);
    })

// Mandando o express utilizar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public')); //habilita a utilização de estilização css/bootstrap/js frontend

//body parser
app.use(bodyParser.urlencoded({extended: false})) //comando permite o envio dos dados do formulario e traduzira numa estrutura JS
app.use(bodyParser.json());

//criação de rotas                                                                                                                                                                                                                                                                                           
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order:[
        ['id', 'DESC']
    ] }).then(perguntas => {
        res.render("index",{  // envia os dados para o frontend na index
            perguntas: perguntas
        });
    }); // SQL select ALL FROM perguntas
    //render = desenhar na tela utilizando recursos do EJS
    
});
//rota perguntar
app.get("/perguntar",(req, res) => {
    res.render("perguntar");
})

//rota salvarperguntar insere os dados no banco
app.post("/salvarpergunta", (req, res) => {
    // recolhe as informações nas variáveis
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    //insert na tabela perguntas
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {          // se tudo ocorrer bem irá redirecionar para a pagina principal
        res.redirect("/");
    });
});

//rota salvar resposta insere os dados no banco
app.post("/salvarresposta", (req, res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId); 
    })
})



//inserindo o id na barra do navegador
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;              //pega paramentro que usuario digitou no navegador
    Pergunta.findOne({                      //busca apenas 1 dado no banco de dados
        where:{id: id},
        order: [
            ['id', 'DESC']
              ]                  //procura o id
    }).then(pergunta => {
        if(pergunta != undefined){ //pergunta encontrada
            Resposta.findAll({
                where: {perguntaId: pergunta.id}
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{ // Não encontrada
            res.redirect("/");
        }
    });                 
})

//para iniciar o servidor, utizar nodemon index.js
app.listen(8080, () => {
    console.log("App Rodando!");});




    //rtsp://admin:123456@172.16.0.70:554/profile1    STREAM MOTOROLA


