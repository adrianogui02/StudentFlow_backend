const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definindo a tabela usuários
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users", // Nome explícito da tabela
  }
);

module.exports = User;
