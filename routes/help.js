const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth') 
//login page

router.get('/crud',ensureAuthenticated,(req,res)=>{
    res.render('help/crud',{
        user: req.user,
        layout: 'layoutMain'
    });
})

module.exports = router; 