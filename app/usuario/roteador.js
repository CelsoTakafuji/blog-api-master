var router = require('express').Router();
var usuarioController = require('./controller');

router.get('/v1/usuarios', usuarioController.listar);
router.get('/v1/usuarios/:id', usuarioController.buscar);
router.post('/v1/usuarios/auth', usuarioController.autenticar);
router.post('/v1/usuarios', usuarioController.cadastrar);
router.post('/v1/usuarios/:id', usuarioController.remover);
router.put('/v1/usuarios/:id', usuarioController.atualizar);

module.exports = router;
