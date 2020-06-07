const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

// Lista de rotas
router.get('/', tarefaController.listar);

// Exportando as rotas
module.exports = router;
