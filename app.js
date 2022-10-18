const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const server = require("./models/ArduinoServer");

var jsdom = require("jsdom");

const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);
var dt = require('datatables.net')(window, $);

//passport config:
require('./config/passport')(passport)

//mongoose
mongoose.connect('mongodb://localhost/laserTag3', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected,,'))
    .catch((err) => console.log(err));

//EJS
app.set('view engine', 'ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({ extended: false }));
//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
// var five = require("johnny-five");
// var Component = require("./config/component")(five);

// const board = new five.Board();

var app2 = module.exports = express();

// board.on("ready", () => {
// const led = new five.Led(6);

// This will grant access to the led instance
// from within the REPL that's created when
// running this program.
// board.repl.inject({
// led
// });

// led.on();
// app.set('led', led);

app.use(express.static("public"));
//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/help', require('./routes/help'));
app.use('/perfil', require('./routes/perfil'));
app.use('/cadastro', require('./routes/cadastro'));
app.use('/componente', require('./routes/componentes'));
app.use('/arduino', require('./routes/arduino'));
app.use('/install', require('./routes/install'));

app.listen(3000);
// });
