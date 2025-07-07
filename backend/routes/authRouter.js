const express = require("express");
const { login } = require("../controller/authController");
const { loginValidator } = require("../validators/authValidator");
const { registerAdmin } = require("../controller/authController");
const { validationResult } = require("express-validator");

const router = express.Router();

router.post("/login", loginValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  login(req, res, next);
});

router.post("/register", registerAdmin);

module.exports = router;
