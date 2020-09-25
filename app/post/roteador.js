var router = require('express').Router();
var postController = require('./controller');

router.post('/v1/posts/:postId/comentarios', postController.adicionarComentario);
router.post('/v1/posts/:postId/comentarios/remover/:comentarioId', postController.removerComentario);
router.post('/v1/posts/:postId/comentarios/alterar/:comentarioId', postController.alterarComentario);
router.get('/v1/posts/qtd/:qtdMax', postController.listarUltimos);
router.get('/v1/posts', postController.listarTodos);
router.get('/v1/posts/:postId', postController.buscarPorId);
router.get('/v1/usuarios/:usuarioId/posts', postController.listarPorUsuario);
router.get('/v1/usuarios/:usuarioId/posts/:postId', postController.buscarPorDonoEId);
router.post('/v1/usuarios/:usuarioId/posts', postController.cadastrar);
router.put('/v1/usuarios/:usuarioId/posts/:postId', postController.atualizar);
router.post('/v1/usuarios/:usuarioId/posts/:postId', postController.remover);

module.exports = router;
