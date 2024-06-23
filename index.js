const express = require("express");
const sequelize = require("./config/database");
const indexRoutes = require("./routes/index");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api", indexRoutes);

// Inicializando servidor
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  try {
    await sequelize.authenticate();
    sequelize.sync().then(() => {
      console.log(`Conexão com o banco de dados foi estabelecida com sucesso.`);
    });
  } catch (error) {
    console.error(`Não foi possível conectar ao banco de dados:`, error);
  }
});
