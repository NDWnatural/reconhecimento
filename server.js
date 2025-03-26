const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Importa o CORS

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do CORS - permita o acesso de qualquer origem
app.use(cors());

// Conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Substitua pela sua senha
  database: 'sistema_porteiro'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('Conexão com o MySQL bem-sucedida!');
});

app.post('/register', (req, res) => {
  const { cpf, nome } = req.body;
  const horarioEntrada = new Date();

  const query = `INSERT INTO usuarios (cpf, nome, horario_entrada) VALUES (?, ?, ?)`;
  db.query(query, [cpf, nome, horarioEntrada], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao registrar usuário');
    } else {
      console.log('Usuário registrado:', result);
      res.status(200).send('Usuário registrado com sucesso!');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
