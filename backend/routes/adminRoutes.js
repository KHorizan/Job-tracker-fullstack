const express = require("express");
const router = express.Router();

const {UpdateUserRole,getAllUsers} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const authorize= require("../middleware/roleMiddleware");

router.get("/users",authMiddleware,authorize("admin"),getAllUsers);
router.put("/users/:id/role",authMiddleware,authorize("admin"),UpdateUserRole);

module.exports = router;