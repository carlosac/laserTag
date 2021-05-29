const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth')


//login handle
router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/', ensureAuthenticated, (req, res) => {
  var usuarios = [];
  // usuarios = User.findOne({ email: email }).exec((err, user) => {
  User.find().
    then(users => {
      // console.log(users[0].name); // 'A'
      return res.render('cadastro', {
        usuarios: users,
        layout: 'layoutMain'
      });
    });


  // var data = JSON.stringify(usuarios);


  //   User.find({}, function(err, docs) {
  //     if (!err) { 
  //         usuarios = docs;
  //         // console.log(docs);
  //         process.exit();
  //     }
  //     else {
  //         throw err;
  //     }
  // });

})

router.get('/register', (req, res) => {
  res.render('login', {

  })
})
//Register handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    badRequestMessage: 'Dados não informados.', //missing credentials
    failureFlash: true
  })(req, res, next)
})
router.post('/excluir', ensureAuthenticated, (req, res) => {
  var id = req.body.id;
  User.findByIdAndRemove(id).exec(); 
  res.redirect('/users');
})
router.post('/editar', ensureAuthenticated, (req, res) => {
  // console.log("ativo: " + req.params.ativo);
  // console.log("user: " + req.params.user);
  console.log("nome: " + req.body.nome);
  console.log("email: " + req.body.email);
  console.log("ativo: " + req.body.radioAtivo);
  console.log("perfil: " + req.body.perfil);
  
  var id = req.body.id;

  User.findById(id, function (err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.name = req.body.nome;
    doc.email = req.body.email;
    doc.ativo = req.body.radioAtivo;
    doc.perfil = req.body.perfil;
    doc.save();
    res.redirect('/users');
  })

})
//register post handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  console.log(' Name ' + name + ' email :' + email + ' pass:' + password);
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Preencha todos os campos" })
  }
  //check if match
  if (password !== password2) {
    errors.push({ msg: "Senhas diferentes" });
  }

  //check if password is more than 6 characters
  if (password.length < 6) {
    errors.push({ msg: 'Senha deve ter no mínimo 6 carateres' })
  }
  if (errors.length > 0) {
    res.render('login', {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2
    })
  } else {
    //validation passed
    User.findOne({ email: email }).exec((err, user) => {
      console.log(user);
      if (user) {
        errors.push({ msg: 'Email já cadastrado' });
        res.render('login', { errors, name, email, password, password2 })
      } else {
        var contaAtiva = email == 'admin@admin.com' ? true : false;
        const newUser = new User({
          name: name,
          email: email,
          password: password,
          ativo: contaAtiva
        });

        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt,
            (err, hash) => {
              if (err) throw err;
              //save pass to hash
              newUser.password = hash;
              //save user
              newUser.save()
                .then((value) => {
                  console.log(value)
                  req.flash('success_msg', 'Cadastrado com sucesso!');
                  res.redirect('/');
                })
                .catch(value => console.log(value));

            }));
      }
    })
  }
})
//logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Desconectado com sucesso');
  res.redirect('/');
  // res.render('login');
})
module.exports = router;