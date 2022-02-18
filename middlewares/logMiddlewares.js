const fs = require('fs')

function logMiddlewares(req, res, next){
    let user = req.session.userLogged
    if(user){
        next();
    }else{
        res.redirect('/users/login')
    }
}

module.exports = logMiddlewares;