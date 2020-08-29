const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "Jan",
  email: "jan@wp.pl",
  password: "superhaslo123",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

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
    .expect(received)
    .toBe("XD");
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Andrew",
      email: "andrew@example.com",
      password: "MyPass777!",
    })
    .expect(201);
});
