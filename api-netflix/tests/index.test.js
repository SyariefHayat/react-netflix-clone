require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Register Pages", () => {
  it("should return success signup", async () => {
    const response = await request(app)
      .post("/sign-up")
      .set("Content-Type", "application/json")
      .send({
        email: "testing@gmail.com",
        password: "testing123",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User created successfully");
  });

  it("should return failed signup", async () => {
    const response = await request(app)
      .post("/sign-up")
      .set("Content-Type", "application/json")
      .send({
        email: "testing@gmail.com",
        password: "testing123",
      });
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Email already exists");
  });
});

describe("Login Pages", () => {
  it("should return success sign in", async () => {
    const response = await request(app)
      .post("/my-token")
      .set("Content-Type", "application/json")
      .send({
        email: "testing@gmail.com",
        password: "testing123",
        token: "eyhnxcbnzbcjkshfheufuwdawdawd",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("success signing in token");
  });

  it("should return failed sign in", async () => {
    const response = await request(app)
      .post("/my-token")
      .set("Content-Type", "application/json")
      .send({
        email: "invalid@email.com",
        password: "invalid123",
        token: "eyhnxcbnzbcjkshfheufuwdawdawd",
      });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("User not found");
  });
});

describe("Browse Pages", () => {
  it("should return success getting favorite movies", async () => {
    const response = await request(app).get(
      "/my-movies/testing@gmail.com/eyhnxcbnzbcjkshfheufuwdawdawd"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("success getting favorite movies");
  });

  it("should return failed getting favorite movies", async () => {
    const response = await request(app).get(
      "/my-movies/invalid@email.com/invalidtoken123"
    );
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Error, Unauthorized");
  });

  it("should return success adding favorite movies", async () => {
    const response = await request(app)
      .post("/my-movies")
      .set("Content-Type", "application/json")
      .send({
        email: "testing@gmail.com",
        token: "eyhnxcbnzbcjkshfheufuwdawdawd",
        data: {
          id: 1,
          title: "Harry Potter",
          description: "The Wizard Movie",
        },
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("success adding favorite list movies");
  });

  it("should return failed adding favorite movies", async () => {
    const response = await request(app)
      .post("/my-movies")
      .set("Content-Type", "application/json")
      .send({
        email: "invalid@email.com",
        token: "invalidtoken123",
        data: {
          id: 1,
          title: "Harry Potter",
          description: "The Wizard Movie",
        },
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Error, Unauthorized");
  });

  it("should return success delete favorite movies", async () => {
    const response = await request(app)
      .delete("/my-movies")
      .set("Content-Type", "application/json")
      .send({
        email: "testing@gmail.com",
        token: "eyhnxcbnzbcjkshfheufuwdawdawd",
        movie_id: 1,
      });
    expect(response.statusCode).toBe(204);
    expect(response.body.message).toBe(undefined);
  });

  it("should return failed delete favorite movies", async () => {
    const response = await request(app)
      .delete("/my-movies")
      .set("Content-Type", "application/json")
      .send({
        email: "invalid@email.com",
        token: "invalidtoken123",
        movie_id: 1,
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Error, Unauthorized");
  });

  it("should return success sign out", async () => {
    const response = await request(app)
      .delete("/my-token")
      .set("Content-Type", "application/json")
      .send({
        email: "testing@gmail.com",
        token: "eyhnxcbnzbcjkshfheufuwdawdawd",
      });
    expect(response.statusCode).toBe(204);
    expect(response.body.message).toBe(undefined);
  });

  it("should return failed sign out", async () => {
    const response = await request(app)
      .delete("/my-token")
      .set("Content-Type", "application/json")
      .send({
        email: "invalid@email.com",
        token: "invalidtoken123",
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Error, Unauthorized");
  });
});
