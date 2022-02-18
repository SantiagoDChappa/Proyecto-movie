const fs = require('fs')

function adminController(req, res, next){
    let user = req.session.userLogged
    if(user && user.rol == 1){
        next();
    }else{
        res.redirect('/')
    }

}
module.exports = adminController;