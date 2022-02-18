const db = require('../database/models')
const bcryptjs = require('bcryptjs')
const Users = db.Users
const { validationResult } = require('express-validator')

const usersController = {
    register: (req, res)=>{
        res.render('register')
    },
    registerSend: (req, res)=>{
        let errors = validationResult(req)
        // let errores = errors.mapped()
        // res.send(errores)
        if(errors.isEmpty()){
            Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((email)=>{
                if(!email){
                Users.create({
                name: req.body.name,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password,10),
                rol: req.body.rol
                })
            res.redirect('/users/login')
            }else{
                res.render('register', {errors: 
                    {email: 
                        {msg: 'Este email ya se encuentra registrado'}
                    },
                    oldBody: req.body 
                })
            }
            })
            
        }else{
            res.render('register', {
                errors: errors.mapped(),
                oldBody: req.body 
            })
        }
    },
    login: (req, res)=>{
        res.render('login')
    },
    loginSend: (req, res)=>{
        let errors = validationResult(req)
        if(errors.isEmpty()){
        Users.findOne({
            where:{
                email: req.body.email
            }
        })
            .then((user)=>{
                if(user){
                    let passwordCompare = bcryptjs.compareSync(req.body.password, user.password)
                    if(passwordCompare == true){
                        delete user.dataValues.password
                        req.session.userLogged = user

                        if(req.body.recordar != undefined){
                            res.cookie('recordar', user.email, {maxAge: (60000)*100})
                        }

                        return res.redirect('/')
                    }else{
                        res.render('login', {
                            errors: {
                                password:{
                                    msg:'La contraseña es incorrecta'
                                }
                            },
                            oldBody: req.body
                        })
                    }
                }else{
                    res.render('login', {
                        errors: {
                            email:{
                                msg:'El email es incorrecto'
                            }
                        }
                    })
                }
            })    
        }else{
            res.render('login', {errors: errors.mapped()})
        }
        
    },
    logout: (req, res)=>{
        res.clearCookie('recordar')
        req.session.destroy()

        res.redirect('/users/login')
    },
    profile: (req, res)=>{
        res.render('profile', {
            user: req.session.userLogged
        })
    },
    check: (req, res)=>{
        let user = req.session.userLogged
        if (user) {
            res.send('El usuario logueado es ' + user.email)
        }else{
            res.send('No estas logueado')
        }
    }
}

module.exports = usersController;