const express = require('express');
const router = express.Router();
const Perfil = require("../models/perfil");
const { ensureAuthenticated } = require('../config/auth')



router.get('/', ensureAuthenticated, (req, res) => {
  var perfis = [];
  // usuarios = User.findOne({ email: email }).exec((err, user) => {
  Perfil.find({}, null, {
    sort: {
      codigoPerfil: 1
    }
  }).
    then(perfis => {
      // console.log(users[0].name); // 'A'
      return res.render('perfil/perfil', {
        perfis: perfis,
        user: req.user,
        layout: 'layoutMain'
      });
    });

})
router.post('/register', ensureAuthenticated, (req, res) => {
  var msg = 'Cadastrado com sucesso!';
  var tipoMsg = 'success_msg';
  const { name, codigoPerfil } = req.body;
  const novoPerfil = new Perfil({
    name: name,
    codigoPerfil: codigoPerfil
  });

  novoPerfil.save(function (err) {
    if (err) {
      msg = 'Erro no cadastro do perfil. Verifique o log!';
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        msg = 'Código de perfil já existente!';
        tipoMsg = 'error_msg';
      }

      tipoMsg = 'error_msg';
      console.log(err.name + ' -> ' + err.code)
    }

    req.flash(tipoMsg, msg);
    res.redirect('/perfil');
  });

})
router.post('/atualizar', ensureAuthenticated, (req, res) => {
  var msg = 'Atualizado com sucesso!';
  var tipoMsg = 'success_msg';

  const { id, name, codigoPerfil } = req.body;
  Perfil.findById(id, function (err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.name = req.body.name;
    doc.codigoPerfil = req.body.codigoPerfil;

    // doc.save();
    // req.flash('success_msg', 'Perfil atualizado!');
    // res.redirect('/perfil');
    doc.save(function (err) {
      if (err) {
        msg = 'Erro no cadastro do perfil. Verifique o log!';
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate username
          msg = 'Código de perfil já existente!';
          tipoMsg = 'error_msg';
        }

        tipoMsg = 'error_msg';
        console.log(err.name + ' -> ' + err.code)
      }

      req.flash(tipoMsg, msg);
      res.redirect('/perfil');
    })
  })
});


router.post('/excluir', ensureAuthenticated, (req, res) => {
  var id = req.body.id;
  Perfil.findByIdAndRemove(id).exec();
  req.flash('success_msg', 'Excluído com sucesso!');
  res.redirect('/perfil');
})

module.exports = router;