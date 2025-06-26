const express = require("express");
const router = express.Router();
const { saveContact } = require("../controller/contactController");

router.post("/contact", saveContact);

module.exports = router;
