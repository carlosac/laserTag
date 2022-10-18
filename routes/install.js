const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var five = require("johnny-five");
var Component = require("../config/component")(five);
const Componente = require('../models/componente');
const Install = require('../models/install');
const Arduino = require('../models/arduino');

router.get('/listar/:arduinoId', ensureAuthenticated, async (req, res) => {
    var installs, componentes = [];
    var arduinoId = req.params.arduinoId;


    try {
        componentes = await Componente.find();
        installs = await Install.find({ arduino: arduinoId }, null, {
        }).populate(['arduino', 'componente']).
            then(installs => {
                return res.render('install/install', {
                    installs: installs,
                    arduinoId: arduinoId,
                    componentes: componentes,
                    user: req.user,
                    layout: 'layoutMain'
                });
            });
    } catch (err) {
        tipoMsg = 'error_msg';
        msg = 'Erro na instalação do componente. Verifique o log!';
        console.log(err);
        req.flash(tipoMsg, msg);
        res.redirect('/dashboard');
    }


})

router.post('/add', ensureAuthenticated, async (req, res) => {
    var msg = 'Cadastrado com sucesso!';
    var tipoMsg = 'success_msg';
    try {
        const install = await Install.create(req.body);
        console.log(req.body);
        Arduino.findById(req.body.arduino, function (err, doc) {
            console.log(doc);
            listaInstalls = doc.installs;
            listaInstalls.indexOf(install._id) == -1 ? listaInstalls.push(install._id) : console.log("This item already exists");
            doc.installs = listaInstalls;

            doc.save(function (err) {
                console.log(err)
            });

        });
        req.flash('success_msg', 'Incluído com sucesso!');
        res.redirect('/install/listar/' + req.body.arduino);
    } catch (err) {
        tipoMsg = 'error_msg';
        msg = 'Erro na desinstalação do componente. Verifique o log!';
        console.log(err);
        req.flash(tipoMsg, msg);
        res.redirect('/arduino');
    }


})
router.post('/excluir', ensureAuthenticated, (req, res) => {
    var id = req.body.id;
    try {
        Install.findByIdAndRemove(id).exec();
        Arduino.findById(req.body.arduino, function (err, doc) {
            const listaInstalls = doc.installs;

            const index = listaInstalls.indexOf(req.body.id);
            if (index > -1) {
                listaInstalls.splice(index, 1);
            }
            doc.installs = listaInstalls;

            doc.save();

        });
        req.flash('success_msg', 'Excluído com sucesso!');
        res.redirect('/install/listar/' + req.body.arduino);

    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Erro ao desinstalar componente!');
        res.redirect('/install/listar/' + req.body.arduino);

    }
})

module.exports = router;