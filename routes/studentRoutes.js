const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middlewares/auth");

router.post("/students", authMiddleware, studentController.createStudent);
router.get("/students", authMiddleware, studentController.getStudents);
router.get("/students/:id", authMiddleware, studentController.getStudent);
router.put("/students/:id", authMiddleware, studentController.updateStudent);
router.delete("/students/:id", authMiddleware, studentController.deleteStudent);

module.exports = router;
