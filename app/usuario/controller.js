var usuarios = require('./usuarios');
var respostas = require('../utilidades/respostas');

var cadastrar = function(req, res){
  var usuario = req.body;
  usuarios.cadastrar(usuario, respostas.criado(res), respostas.erro(res));
};

var remover = function(req, res){
    usuarios.remover(req.params.id, respostas.criado(res), respostas.erro(res));
}

var atualizar = function(req, res){
    var usuarioId = req.params.id;
    var usuario = req.body;

    usuario.id = usuarioId;

    usuarios.atualizar(usuario, respostas.ok(res), respostas.erro(res));
}

var listar = function(req, res){
    usuarios.listar(respostas.ok(res), respostas.erro(res));
}

var autenticar = function(req, res){
  usuarios.autenticar(req.body.login, req.body.senha, respostas.ok(res), respostas.erro(res));
}

var buscar = function(req, res){
    var id = req.params.id;
    usuarios.buscar(id, respostas.ok(res), respostas.erro(res));
}

exports.cadastrar = cadastrar;
exports.remover = remover;
exports.atualizar = atualizar;
exports.listar = listar;
exports.autenticar = autenticar;
exports.buscar = buscar;
