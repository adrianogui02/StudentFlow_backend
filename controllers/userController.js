const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Criar usuário
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    } else {
      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar o novo usuário
      const newUser = await User.create({
        username: username,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login do usuário
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "seu_segredo_jwt",
      { expiresIn: "1h" }
    );

    // Não retornar a senha para o client
    const { password: _, ...userData } = user.toJSON();

    // Retornar o token e os dados do usuário
    res.json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
