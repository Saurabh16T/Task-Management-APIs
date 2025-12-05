const request = require("supertest");
const app = require("../../app");
const db = require("../test-db");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("POST /users/login", () => {
  it("should log in a user successfully", async () => {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Login User",
      email: "login@example.com",
      password: hashedPassword,
    });

    const res = await request(app)
      .post("/users/login")
      .send({
        email: "login@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("token");
  });

  it("should fail login with wrong password", async () => {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Login Fail User",
      email: "fail@example.com",
      password: hashedPassword,
    });

    const res = await request(app)
      .post("/users/login")
      .send({
        email: "fail@example.com",
        password: "wrong",
      });

    expect(res.statusCode).toBe(400);
  });

  it("should fail login if user does not exist", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({
        email: "notfound@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(400); // your API returns 400, not 404
  });
});
