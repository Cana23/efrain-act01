const { body, validationResult } = require("express-validator");

const contactValidationRules = [
  body("nombre")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres.")
    .escape(),

  body("correo")
    .trim()
    .isEmail()
    .withMessage("El correo no es válido.")
    .normalizeEmail(),

  body("telefono")
    .trim()
    .isLength({ min: 7, max: 15 })
    .withMessage("El teléfono debe tener entre 7 y 15 dígitos.")
    .isNumeric()
    .withMessage("El teléfono solo debe contener números."),

  body("mensaje")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("El mensaje debe tener entre 10 y 1000 caracteres.")
    .escape(),

  body("token").notEmpty().withMessage("El token de reCAPTCHA es obligatorio."),
];

// Middleware para manejar los errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((e) => e.msg),
    });
  }
  next();
};

module.exports = {
  contactValidationRules,
  validate,
};
