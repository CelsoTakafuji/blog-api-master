var Post = require('./modelo');
var Usuario = require('../usuario/modelo');
var respostas = require('../utilidades/respostas');

var listarUltimos = function(maximoItems, quandoListar, quandoDerErro){
    var q = Post.find({}).sort({'dataPostagem': -1});
    if(parseInt(maximoItems) != 0){
      q.limit(parseInt(maximoItems));
    }
    q.exec(respostas.tratar(quandoListar, quandoDerErro));
}

var listarTodos = function(pagina, maximoItems, quandoListar, quandoDerErro){
    Post.paginate({}, {page: pagina, sort: {'dataPostagem': -1}, limit: maximoItems}, respostas.tratar(quandoListar, quandoDerErro));
}

var listarPorUsuario = function(usuarioId, quandoListar, quandoDerErro){
    Post.find({dono:usuarioId}).sort({'dataPostagem': -1})
        .exec(respostas.tratar(quandoListar, quandoDerErro));
}

var listarPorTitulo = function(pagina, maximoItems, titulo, quandoListar, quandoDerErro){
    var query = {titulo:new RegExp(titulo, "i")};
    var paginacao = { page: pagina,
                      sort: {
                          'dataPostagem': -1
                      },
                      limit: maximoItems
    };
    Post.paginate(query, paginacao, respostas.tratar(quandoListar, quandoDerErro));
}

var cadastrar = function(usuarioId, post, quandoSalvar, quandoDerErro){
  var filtro = {nome:true, login:true};

  Usuario.findById(usuarioId)
      .select(filtro)
      .exec(function(err, data){
          if(err){
             quandoDerErro(err);
          } else {
             post.dono = usuarioId;
             post.donoNome = data.nome;

             new Post(post).save(respostas.tratar(quandoSalvar, quandoDerErro));
          }
      });
}

var remover = function(postId, quandoRemover, quandoDerErro){
    Post.findById(postId).remove()
    .exec(function(err, data){
        if(err){
            quandoDerErro(err);
        } else {
            quandoRemover(err);
        }
    });
}

var atualizarDadosPost = function(post, novoPost, quandoDerErro, quandoAtualizar){
    post.titulo = novoPost.titulo;
    post.conteudo = novoPost.conteudo;
    post.save(function(erro, resultado){
        if(erro){
            quandoDerErro(erro);
        } else {
            quandoAtualizar(post);
        }
    });
}

var atualizar = function(novoPost, quandoAtualizar, quandoDerErro){
    Post.findOne({_id:novoPost.id, dono:novoPost.dono})
        .exec(function(err, post){
            if(err){
                quandoDerErro(err);
            } else {
                atualizarDadosPost(post, novoPost, quandoDerErro, quandoAtualizar);
            }
        });
}

var buscarPorDonoEId = function(id, dono, quandoEncontrar, quandoDerErro){
    Post.findOne({_id:id, dono:dono})
        .exec(respostas.tratar(quandoEncontrar, quandoDerErro));
}

var buscarPorId = function(id, quandoEncontrar, quandoDerErro){
    Post.findById(id)
        .exec(respostas.tratar(quandoEncontrar, quandoDerErro));
}

var setarNovoComentario = function(post, comentario, quandoAdicionar, quandoDerErro){
    post.comentarios.push({usuario:comentario.email, conteudo:comentario.conteudo});
    post.save(function(erro){
        if(erro){
            quandoDerErro(erro);
        } else {
            quandoAdicionar(post);
        }
    });
}

function removerIdFromJSON(id, arr) {
    return arr.map(function (obj) {
        if (obj.id != id) return obj;
        else return false;
    }).filter(Boolean);
}

var adicionarComentario = function(postId, comentario, quandoAdicionar, quandoDerErro){
    Post.findById(postId)
        .exec(function(err, post){
            if(err){
                quandoDerErro(err);
            } else {
                setarNovoComentario(post, comentario, quandoAdicionar, quandoDerErro);
            }
        });
}

var alterarComentario = function(postId, comentarioId, comentario, quandoAlterar, quandoDerErro){
  Post.findById(postId)
      .exec(function(err, post){
          if(err){
              quandoDerErro(err);
          } else {
              post.comentarios = removerIdFromJSON(comentarioId, post.comentarios);

              post.comentarios.push({_id:comentario._id, usuario:comentario.usuario, conteudo:comentario.conteudo, dataComentario:comentario.dataComentario});

              post.save(function(erro){
                  if(erro){
                      quandoDerErro(erro);
                  } else {
                      quandoAlterar(post);
                  }
              });
          }
      });
}

var removerComentario = function(postId, comentarioId, quandoRemover, quandoDerErro){
    Post.findById(postId)
        .exec(function(err, post){
            if(err){
                quandoDerErro(err);
            } else {
                post.comentarios = removerIdFromJSON(comentarioId, post.comentarios);
                post.save(function(erro){
                    if(erro){
                        quandoDerErro(erro);
                    } else {
                        quandoRemover(post);
                    }
                });
            }
        });
}

var adicionarComentario = function(postId, comentario, quandoAdicionar, quandoDerErro){
    Post.findById(postId)
        .exec(function(err, post){
            if(err){
                quandoDerErro(err);
            } else {
                setarNovoComentario(post, comentario, quandoAdicionar, quandoDerErro);
            }
        });
}

exports.adicionarComentario = adicionarComentario;
exports.removerComentario = removerComentario;
exports.alterarComentario = alterarComentario;
exports.buscarPorDonoEId = buscarPorDonoEId;
exports.buscarPorId = buscarPorId;
exports.listarPorTitulo = listarPorTitulo;
exports.listarUltimos = listarUltimos;
exports.listarTodos = listarTodos;
exports.listarPorUsuario = listarPorUsuario;
exports.cadastrar = cadastrar;
exports.remover = remover;
exports.atualizar = atualizar;
