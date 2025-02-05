const { check } = require("express-validator")


exports.validatorRegister = [
    check("username").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("password").exists().notEmpty().isLength({ min: 6, max: 16 }),


]

exports.validatorLogin = [
    check("username").exists().notEmpty().isString().withMessage("El nombre de usuario es obligatorio y debe ser una cadena."),
    check("password").exists().notEmpty().isLength({ min: 6, max: 16 }).withMessage("La contraseña debe tener entre 6 y 16 caracteres."),
];


