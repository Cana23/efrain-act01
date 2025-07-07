const express = require("express");
const { getLeads, updateLeadStatus } = require("../controller/leadController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/leads", authMiddleware, getLeads);
router.patch("/leads/:id", authMiddleware, updateLeadStatus);

module.exports = router;
