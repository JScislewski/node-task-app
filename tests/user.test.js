const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { count } = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

afterEach(() => {
  console.log("afterEach");
});
test("Should throw duplicate email error", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "jan",
      email: "jan@wp.pl",
      password: "superhaslo123",
    })
    .expect(400);
});

test("Should throw weak password", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "jan",
      email: "jan2@wp.pl",
      password: "haslo",
    })
    .expect(400);
});

test("Should signup a new user", async () => {
  const oldUsersCount = await User.countDocuments();
  await request(app)
    .post("/users")
    .send({
      name: "Andrew",
      email: "andrew@example.com",
      password: "MyPass777!",
    })
    .expect(201);
  const newUsersCount = await User.countDocuments();
  expect(newUsersCount).toBe(oldUsersCount + 1);
});
