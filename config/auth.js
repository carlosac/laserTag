module.exports = {
    ensureAuthenticated : function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg' , 'Faça o login para acessar essa página');
        res.redirect('/users/login');
    }
}