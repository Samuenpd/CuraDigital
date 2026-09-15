const express = require('express');
const router = express.Router();
const ofertasController = require('../controllers/ofertasController');
const { autenticar } = require('../middlewares/auth');

router.get('/', ofertasController.listar);
router.get('/:id', ofertasController.buscarPorId);
router.post('/', autenticar, ofertasController.criar);
router.put('/:id', autenticar, ofertasController.atualizar);
router.delete('/:id', autenticar, ofertasController.remover);

module.exports = router;
