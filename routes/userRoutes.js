const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rotas para registrar e autenticar usuários
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
