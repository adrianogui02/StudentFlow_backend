const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./users"); // Importando o modelo User

// Definindo a tebela estudantes
const Student = sequelize.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "Students",
  }
);

Student.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Student, { foreignKey: "userId" });

module.exports = Student;
