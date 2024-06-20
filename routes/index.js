const express = require("express");
const userRoutes = require("./userRoutes");
const studentRoutes = require("./studentRoutes");

const router = express.Router();

// Use as rotas do usuário
router.use("/user", userRoutes);
router.use("/student", studentRoutes);

// Use outras rotas conforme necessário

module.exports = router;
