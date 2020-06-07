const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);
//Lista todos os livros
router.get('/books', (req, res) => {
  execSQLQuery('SELECT * FROM tbl_books', res);
});

//pesquisa livro por id
router.get('/books/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM tbl_books' + filter, res);
});

//deleta um livro pelo id
router.delete('/books/:id', (req, res) => {
  execSQLQuery(
    'DELETE FROM tbl_books WHERE ID=' + parseInt(req.params.id),
    res
  );
});

router.post('/books', (req, res) => {
  const titulo = req.body.titulo;
  const autor = req.body.autor;
  const editora = req.body.editora;
  const area = req.body.area;
  execSQLQuery(
    `INSERT INTO tbl_books(id, titulo, autor, editora, area) VALUES(NULL, '${titulo}','${autor}', '${editora}','${area}')`,
    res
  );
});

router.patch('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const titulo = req.body.titulo;
  const autor = req.body.autor;
  const editora = req.body.editora;
  const area = req.body.area;
  execSQLQuery(
    `UPDATE tbl_books SET titulo='${titulo}',autor='${autor}', editora='${editora}',area='${area}' WHERE ID=${id}`,
    res
  );
});

app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'meteoro85',
    database: 'books',
  });

  connection.query(sqlQry, function (error, results, fields) {
    if (error) res.json(error);
    else res.json(results);
    connection.end();
    console.log('executou!');
  });
}
