const Student = require("../models/students");

// Criar estudante
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create({ ...req.body, userId: req.user.id });
    res.status(201).json(student);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // Tratamento para erro de validação, como email inválido
      const validationErrors = error.errors.map((err) => err.message);
      return res.status(400).json({ error: validationErrors });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      // Tratamento para erro de duplicação de e-mail
      const duplicatedField = error.errors[0]?.path;
      const errorMessage =
        duplicatedField === "email"
          ? "Email already exists. Please use a different email."
          : "Unique constraint error.";

      return res.status(409).json({ error: errorMessage });
    }
    console.error("Error creating student:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Listar estudantes
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ where: { userId: req.user.id } });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: error.message });
  }
};

// Listar um estudante por ID
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ error: error.message });
  }
};

// Atualizar estudante por ID
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (student) {
      await student.update(req.body);
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: error.message });
  }
};

// Deletar estudante por ID
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (student) {
      await student.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: error.message });
  }
};
