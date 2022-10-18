const express = require('express');
const router = express.Router();
const Arduino = require("../models/arduino");
const server = require("../models/ArduinoServer");
const { ensureAuthenticated } = require('../config/auth');



router.post('/incluir', ensureAuthenticated, async (req, res) => {
  var msg = 'Cadastrado com sucesso!';
  var tipoMsg = 'success_msg';
  try {
    const arduino = await Arduino.create(req.body);
    req.flash(tipoMsg, msg);
    res.redirect('/arduino');
  } catch (err) {
    tipoMsg = 'error_msg';
    msg = 'Erro no cadastro do Arduino. Verifique o log!';
    console.log(err);
    req.flash(tipoMsg, msg);
    res.redirect('/arduino');
  }

})
router.get('/', ensureAuthenticated, async (req, res) => {
  var arduinos = [];
  try {
    arduinos = await Arduino.find();
    return res.render('arduino/arduino', {
      arduinos: arduinos,
      user: req.user,
      layout: 'layoutMain'
    });
  } catch (err) {
    tipoMsg = 'error_msg';
    msg = 'Erro no cadastro do projeto. Verifique o log!';
    console.log(err);
    req.flash(tipoMsg, msg);
    res.redirect('/dashboard');
  }

});
router.post('/atualizar', ensureAuthenticated, (req, res) => {
  var msg = 'Atualizado com sucesso!';
  var tipoMsg = 'success_msg';

  const { id, name, description, ip, porta } = req.body;
  Arduino.findById(id, function (err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.name = req.body.name;
    doc.description = req.body.description;
    doc.ip = req.body.ip;
    doc.port = req.body.port;

    doc.save(function (err) {
      if (err) {
        msg = 'Erro no cadastro do Arduino. Verifique o log!';
        if (err.name === 'ValidationError') {
          let error = doc.validateSync();
          console.log('error -> ' + error);
          //    msg = error.errors['tipo'].message;
        }

        tipoMsg = 'error_msg';
        console.log(err.name + ' -> ' + err.code)
      }

      req.flash(tipoMsg, msg);
      res.redirect('/Arduino');
    })
  })
});
router.post('/excluir', ensureAuthenticated, (req, res) => {
  var id = req.body.id;
  Arduino.findByIdAndRemove(id).exec();
  req.flash('success_msg', 'Excluído com sucesso!');
  res.redirect('/Arduino');
})
router.get('/ligarLed/:ledPorta/:arduinoId', (req, res) => {
  server.toggleLed(req.params.ledPorta);
  req.flash('success_msg', 'Comando enviado ao Arduíno');
  res.redirect('/install/listar/'+ req.params.arduinoId);
})
module.exports = router;

