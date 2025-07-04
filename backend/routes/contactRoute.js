const express = require("express");
const { saveContact } = require("../controller/contactController");
const {
  contactValidationRules,
  validate,
} = require("../validators/contactValidator");

const router = express.Router();

router.post("/contact", contactValidationRules, validate, saveContact);

module.exports = router;
