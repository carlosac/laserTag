const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //match user
            User.findOne({ email: email }).populate('perfil')
                .then((user) => {
                    console.log(user);
                    if (!user) {
                        return done(null, false, { message: 'email não cadastrado' });
                    }
                    //math passwords
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            if (user.ativo) {
                                return done(null, user);
                            } else {
                                return done(null, false, { message: 'Usuário inativo' });
                            }
                        } else {
                            return done(null, false, { message: 'Senha inválida' });
                        }
                    })
                })
                .catch((err) => { console.log(err) })
        })
    )
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        }).populate('perfil')
    })
}