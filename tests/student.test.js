const request = require("supertest");
const app = require("../index"); // Assumindo que o arquivo de entrada é index.js
const { sequelize } = require("../config/database"); // Para poder manipular o banco de dados nos testes

describe("Test API CRUD operations for students", () => {
  test("Should create a new student", async () => {
    const newStudent = {
      name: "John Doe",
      age: 22,
      email: "john.doe@example.com",
      course: "Computer Science",
    };

    const response = await request(app)
      .post("/api/students")
      .send(newStudent)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newStudent.name);
    expect(response.body.age).toBe(newStudent.age);
    expect(response.body.email).toBe(newStudent.email);
    expect(response.body.course).toBe(newStudent.course);
  });

  test("Should fetch all students", async () => {
    await request(app).post("/api/students").send({
      name: "Jane Doe",
      age: 20,
      email: "jane.doe@example.com",
      course: "Mathematics",
    });

    const response = await request(app).get("/api/students").expect(200);

    expect(response.body.length).toBe(1);
  });

  test("Should fetch a single student by ID", async () => {
    const student = await request(app).post("/api/students").send({
      name: "John Doe",
      age: 22,
      email: "john.doe@example.com",
      course: "Computer Science",
    });

    const response = await request(app)
      .get(`/api/students/${student.body.id}`)
      .expect(200);

    expect(response.body.name).toBe("John Doe");
  });

  test("Should update a student", async () => {
    const student = await request(app).post("/api/students").send({
      name: "John Doe",
      age: 22,
      email: "john.doe@example.com",
      course: "Computer Science",
    });

    const updatedData = {
      name: "John Smith",
      age: 23,
      email: "john.smith@example.com",
      course: "Physics",
    };

    const response = await request(app)
      .put(`/api/students/${student.body.id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.age).toBe(updatedData.age);
    expect(response.body.email).toBe(updatedData.email);
    expect(response.body.course).toBe(updatedData.course);
  });

  test("Should delete a student", async () => {
    const student = await request(app).post("/api/students").send({
      name: "John Doe",
      age: 22,
      email: "john.doe@example.com",
      course: "Computer Science",
    });

    await request(app).delete(`/api/students/${student.body.id}`).expect(204);

    const response = await request(app)
      .get(`/api/students/${student.body.id}`)
      .expect(404);

    expect(response.body.message).toBe("Student not found");
  });
});
