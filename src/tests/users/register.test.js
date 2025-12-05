const request = require("supertest");
const app = require("../../app");
const db = require("../test-db");

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("POST /users/register", () => {
  it("should register a user", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });
});
