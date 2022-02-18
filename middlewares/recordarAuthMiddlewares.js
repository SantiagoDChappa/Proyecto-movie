const fs = require('fs')
const db = require('../database/models')
const Users = db.Users

function recordarAuthMiddlewares(req, res, next){
    next();
    let recordarCookies = req.cookies.recordar
    let user = req.session.userLogged

    if(recordarCookies != undefined && user == undefined){
        Users.findOne({
            where:{
                email: recordarCookies
            }
        })
            .then((user)=>{
                if(user){
                    req.session.userLogged = user
                }
        })
    }
}

module.exports = recordarAuthMiddlewares;