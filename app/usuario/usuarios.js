var Usuario = require('./modelo');
var Post = require('../post/modelo');
var sha256 = require('sha256');
var respostas = require('../utilidades/respostas');

var cadastrar = function(usuario, quandoSalvar, quandoDerErro){
    usuario.senha = sha256(usuario.senha);
    new Usuario(usuario).save(respostas.tratar(quandoSalvar, quandoDerErro));
}

var remover = function(id, quandoRemover, quandoDerErro){
    Post.find({dono:id}).remove()
    .exec(function(err, data){
      if(err){
          quandoDerErro(err);
      } else {
          Usuario.findById(id).remove()
          .exec(function(err, data){
              if(err){
                  quandoDerErro(err);
              } else {
                  quandoRemover(err);
              }
          });
      }
    });
}

var atualizarDados = function(usuario, novoUsuario, quandoDerErro, quandoAtualizar){
    usuario.nome = novoUsuario.nome;
    usuario.login = novoUsuario.login;

    if(novoUsuario.avatar && novoUsuario.avatar != "" && novoUsuario.avatar != null){
        usuario.avatar = novoUsuario.avatar;
    }

    if(novoUsuario.senhaNova && novoUsuario.senhaNova != "" && novoUsuario.senhaNova != null){
      if(usuario.senha.toString().trim() != sha256(novoUsuario.senhaNova.toString().trim())){
        usuario.senha = sha256(novoUsuario.senhaNova);
      }
    }

    usuario.save(function(erro, resultado){
        if(erro){
            quandoDerErro(erro);
        } else {
            quandoAtualizar(usuario);
        }
    });
}

var atualizar = function(novoUsuario, quandoAtualizar, quandoDerErro){
    Usuario.findOne({_id:novoUsuario.id})
        .exec(function(err, usuario){
            if(err){
                quandoDerErro(err);
            } else {
                atualizarDados(usuario, novoUsuario, quandoDerErro, quandoAtualizar);
            }
        });
}

var listar = function(quandoListar, quandoDerErro){
    var filtro = {nome:true, login:true};
    Usuario.find()
        .select(filtro)
        .exec(respostas.tratar(quandoListar, quandoDerErro));
}

var autenticar = function(login, senha, quandoEncontrar, quandoDerErro){
    var query = {login:login, senha:sha256(senha)};
    var filtro = {nome:true, login:true};
    Usuario.findOne(query)
        .select(filtro)
        .exec(function(err, usuario){
            if(err){
                quandoDerErro(err);
            } else if(usuario) {
                quandoEncontrar(usuario);
            } else {
                quandoDerErro(new Error('Usuario invalido!'));
            }
        });
}

var buscar = function(id, quandoEncontrar, quandoDerErro){
    var filtro = {nome:true, login:true, senha:true, avatar:true};
    Usuario.findById(id)
        .select(filtro)
        .exec(function(err, usuario){
            if(err){
                quandoDerErro(err);
            } else if(usuario) {
                quandoEncontrar(usuario);
            } else {
                quandoDerErro(new Error('Usuario invalido!'));
            }
        });
}

exports.listar = listar;
exports.autenticar = autenticar;
exports.buscar = buscar;
exports.cadastrar = cadastrar;
exports.remover = remover;
exports.atualizar = atualizar;
