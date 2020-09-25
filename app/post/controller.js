var posts = require('./posts');
var respostas = require('../utilidades/respostas');

var remover = function(req, res){
    posts.remover(req.params.postId, respostas.criado(res), respostas.erro(res));
}

var cadastrar = function(req, res){
    var post = req.body;

    posts.cadastrar(req.params.usuarioId, post, respostas.criado(res), respostas.erro(res));
}

var atualizar = function(req, res){
    var usuarioId = req.params.usuarioId;
    var postId = req.params.postId;
    var post = req.body;

    post.id = postId;
    post.dono = usuarioId;

    posts.atualizar(post, respostas.ok(res), respostas.erro(res));
}

var buscarPorDonoEId = function(req, res){
    var usuarioId = req.params.usuarioId;
    var postId = req.params.postId;
    posts.buscarPorDonoEId(postId, usuarioId, respostas.ok(res), respostas.erro(res));
}

var buscarPorId = function(req, res){
    var postId = req.params.postId;
    posts.buscarPorId(postId, respostas.ok(res), respostas.erro(res));
}

var listarUltimos = function(req, res){
    var qtd = req.params.qtdMax;
    posts.listarUltimos(qtd, respostas.ok(res), respostas.erro(res));
}

var listarPorUsuario = function(req, res){
    var usuarioId = req.params.usuarioId;
    posts.listarPorUsuario(usuarioId, respostas.ok(res), respostas.erro(res));
}

var listarTodos = function(req, res){
    var titulo = req.query.titulo;
    var pagina = req.query.pagina || 1;
    var maximoItems = req.query.maximoItems || 5;

    if (titulo) {
        posts.listarPorTitulo(pagina, maximoItems, titulo, respostas.ok(res), respostas.erro(res));
    } else {
        posts.listarTodos(pagina, maximoItems, respostas.ok(res), respostas.erro(res));
    }
}

var adicionarComentario = function(req, res){
    var postId = req.params.postId;
    var comentario = req.body;

    if(comentario && comentario.email && comentario.conteudo){
        posts.adicionarComentario(postId, comentario, respostas.ok(res), respostas.erro(res));
    } else {
        respostas.erro(res)({mensagem:'Comentario inválido!'});
    }
}

var removerComentario = function(req, res){
    var postId = req.params.postId;
    var comentarioId = req.params.comentarioId;

    posts.removerComentario(postId, comentarioId, respostas.ok(res), respostas.erro(res));
}

var alterarComentario = function(req, res){
    var postId = req.params.postId;
    var comentarioId = req.params.comentarioId;
    var comentario = req.body;

    posts.alterarComentario(postId, comentarioId, comentario, respostas.ok(res), respostas.erro(res));
}

exports.adicionarComentario = adicionarComentario;
exports.removerComentario = removerComentario;
exports.alterarComentario = alterarComentario;
exports.buscarPorDonoEId = buscarPorDonoEId;
exports.buscarPorId = buscarPorId;
exports.cadastrar = cadastrar;
exports.remover = remover;
exports.atualizar = atualizar;
exports.listarUltimos = listarUltimos;
exports.listarTodos = listarTodos;
exports.listarPorUsuario = listarPorUsuario;
