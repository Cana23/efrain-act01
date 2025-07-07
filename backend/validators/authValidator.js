const { body } = require("express-validator");

const loginValidator = [
  body("email").isEmail().withMessage("Email no válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

module.exports = { loginValidator };
