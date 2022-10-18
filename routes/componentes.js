const express = require('express');
const router = express.Router();
const Componente = require("../models/componente");
const server = require("../models/ArduinoServer");
const { ensureAuthenticated } = require('../config/auth');


router.post('/incluir', ensureAuthenticated, (req, res) => {
    var msg = 'Cadastrado com sucesso!';
    var tipoMsg = 'success_msg';
    const { name, tipo, tipoPorta, descricao } = req.body;
    const novoComponente = new Componente({
      name: name,
      tipo: tipo,
      tipoPorta: tipoPorta,
      descricao: descricao
    });
  
    novoComponente.save(function (err) {
      if (err) {
        msg = 'Erro no cadastro do Componente. Verifique o log!';
        tipoMsg = 'error_msg';
        console.log(err.name + ' -> ' + err.code)
      }
  
      req.flash(tipoMsg, msg);
      res.redirect('/componente');
    });
  
  })
router.get('/', ensureAuthenticated, (req, res) => {
    var componentes = [];
    Componente.find({}, null, {}).
        then(componentes => {
            return res.render('componente/componente', {
                componentes: componentes,
                user: req.user,
                layout: 'layoutMain'
            });
        });
});
router.post('/atualizar', ensureAuthenticated, (req, res) => {
    var msg = 'Atualizado com sucesso!';
    var tipoMsg = 'success_msg';
  
    const { id, name, tipo, tipoPorta, descricao } = req.body;
    Componente.findById(id, function (err, doc) {
      if (err) {
        console.error('error, no entry found');
      }
      doc.name = req.body.name;
      doc.tipo = req.body.tipo;
      doc.tipoPorta = req.body.tipoPorta;
      doc.descricao = req.body.descricao;
  
      doc.save(function (err) {
        if (err) {
          msg = 'Erro no cadastro do Componente. Verifique o log!';
          if (err.name === 'ValidationError' ) {
              let error = doc.validateSync();
              console.log('error -> ' + error);
            //    msg = error.errors['tipo'].message;
          }
  
          tipoMsg = 'error_msg';
          console.log(err.name + ' -> ' + err.code)
        }
  
        req.flash(tipoMsg, msg);
        res.redirect('/Componente');
      })
    })
  });
  router.post('/excluir', ensureAuthenticated, (req, res) => {
    var id = req.body.id;
    Componente.findByIdAndRemove(id).exec();
    req.flash('success_msg', 'Excluído com sucesso!');
    res.redirect('/componente');
  })
module.exports = router;

