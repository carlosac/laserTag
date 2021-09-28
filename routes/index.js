const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//login page
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        res.render('login');
    }
})
router.get('/template', (req, res) => {
    res.render('helloWorld', {
        layout: 'template'
    });
})
//register page
router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login', {

    })
})
router.get('/dashboard', ensureAuthenticated, async (req, res) => {

    res.render('dashboard',{
        user: req.user,
        layout: 'layoutMain'
    });
})

router.get('/help', ensureAuthenticated, (req, res) => {
    res.render('help/help', {
        user: req.user,
        layout: 'layoutMain'
    });
})



module.exports = router;