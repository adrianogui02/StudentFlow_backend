const express = require("express");
const userRoutes = require("./userRoutes");
const studentRoutes = require("./studentRoutes");

const router = express.Router();

// Definindo as rotas para os controlladores de usuários e estudantes
router.use("/user", userRoutes);
router.use("/student", studentRoutes);

module.exports = router;
