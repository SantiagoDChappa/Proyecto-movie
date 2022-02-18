var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const logMiddlewares = require('../middlewares/logMiddlewares');
const { body } = require('express-validator');
const recordarAuthMiddlewares = require('../middlewares/recordarAuthMiddlewares');


//Validaciones de registro
const validacionesRegister = [
    body('name').notEmpty().withMessage('Debes completar el campo con el nombre completo'),
    body('email').notEmpty().withMessage('Debes poner un email').bail()
    .isEmail().withMessage('Debes completar con un email válido'),
    body('password').notEmpty().withMessage('Debes completar el campo con la contraseña').bail()
    .isLength({min:7}).withMessage('La contraseña debe tener al menos 7 caracteres')
]

//Validaciones de login
const validacionesLogin = [
    body('email').notEmpty().withMessage('Debes poner un email'),
    body('password').notEmpty().withMessage('Debes completar el campo con la contraseña').bail()
    .isLength({min:7}).withMessage('La contraseña debe tener al menos 7 caracteres')
]


// Registro
router.get('/register', usersController.register);
router.post('/register', validacionesRegister, usersController.registerSend)

//Iniciar sesion
router.get('/login', usersController.login)
router.post('/login', validacionesLogin, usersController.loginSend)

//Cerrar sesion
router.post('/logout', usersController.logout)

//Check login
router.get('/check', usersController.check)

// Perfil
router.get('/:id', logMiddlewares,usersController.profile)

module.exports = router;
