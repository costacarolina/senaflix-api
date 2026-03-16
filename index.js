//Primeiro precisamos criar o app  usando express
const express = require('express');
const app = express();
 
 
// permitir aceita JSON na requisição
app.use(express.json());
 
const filmes = [
    { id: 1, 
      titulo: "10 coisas que eu odeio em você", 
      anoDeLançamento: 1999, 
      genero: "Comédia/Romance", 
      Image: "https://m.media-amazon.com/images/M/MV5BOTQwYmRhNGQtODI2Mi00ZTRlLTk0Y2QtY2NkNjE1MGNhNTgwXkEyXkFqcGc@._V1_QL75_UX190_CR0,1,190,281_.jpg",
      descrição: "10 Coisas que Eu Odeio em Você (1999) é uma comédia romântica clássica que reimagina A Megera Domada de Shakespeare no ensino médio americano. A trama segue Kat Stratford (Julia Stiles), uma jovem inteligente e antissocial, e Patrick Verona (Heath Ledger), um bad boy contratado para conquistá-la, gerando um romance improvável e cômico." 
    },
];

const series = [
    {   id: 1, 
        titulo: "Stranger Things", 
        anoDeLançamento: 2016, 
        genero: "Terror", 
        Image: "https://static.wikia.nocookie.net/stranger-things/images/0/09/Stranger_Things_Season_1.png/revision/latest?cb=20190825154950&path-prefix=pt-br",
        descrição: "Stranger Things é uma série de sucesso da Netflix que mistura ficção científica, terror e nostalgia dos anos 80. Ambientada em Hawkins, Indiana, a trama acompanha amigos, familiares e o chefe de polícia local investigando desaparecimentos misteriosos e experimentos secretos envolvendo o Mundo Invertido, uma dimensão paralela sombria." 
    },
]
 
 
// adicionar filmes e series
app.post("/filmes", (req, res) => {
    const { titulo, anoDeLançamento, genero, Image, descrição } = req.body;
    if(!titulo || !anoDeLançamento || !genero || !Image || !descrição){
        return res.status(400).json({erro: "Todos os campos são obrigatórios!"})
    }
    const novoFilme = {
        id: filmes.length + 1,
        titulo,
        anoDeLançamento,
        genero,
        Image,
        descrição
    };
    filmes.push(novoFilme);
    return res.status(201).json(novoFilme);
});
 
app.post("/series", (req, res) => {
    const { titulo, anoDeLançamento, genero, Image, descrição } = req.body;
    if(!titulo || !anoDeLançamento || !genero || !Image || !descrição){
        return res.status(400).json({erro: "Todos os campos são obrigatórios!"})
    }
    const novaSerie = {
        id: series.length + 1,
        titulo,
        anoDeLançamento,
        genero,
        Image,
        descrição
    };
    series.push(novaSerie);
    return res.status(201).json(novaSerie);
});
 
 
//Filtrar por gênero
app.get("/filmes", function(req, res){
    const genero = req.query.genero
 
    if (!genero){
        return res.json(filmes)
    }
    const filmesFiltrados = filmes.filter(f => f.genero == genero)
 
    res.json(filmesFiltrados)
})
app.get("/series", function(req, res){
    const genero = req.query.genero
 
    if (!genero){
        return res.json(series)
    }
    const seriesFiltradas = series.filter(s => s.genero == genero)
 
    res.json(seriesFiltradas)
})
 
 
//Filtrar por ID
app.get("/filmes/:id", function(req, res){
    const id = parseInt(req.params.id)
 
    const filme = filmes.find(f => f.id == id)
    if (!filme){
        return res.status(404).json({erro: "Filme não encontrado"})
    }
    res.json(filme)
})
 
app.get("/series/:id", function(req, res){
    const id = parseInt(req.params.id)
 
    const serie = series.find(s => s.id == id)
    if (!serie){
        return res.status(404).json({erro: "Série não encontrada"})
    }
    res.json(serie)
})
 
//mostra todos os filmes e séries
app.get("/filmes", (req, res) => {
    return res.json(filmes)
});
 
app.get("/series", (req, res) => {
    return res.json(series);
});
 
 
//Segundo passo, colocar o servido para rodar
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});