const Student = require("../models/students");

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create({ ...req.body, userId: req.user.id });
    res.status(201).json(student);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ where: { userId: req.user.id } });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: error.message });
  }
};

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
