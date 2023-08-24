import UserModel from "@/models/user";
import userRouter from "@/routes/userRouter";
import chai from "chai";
import request from "supertest";
import { app, setupMongoTestServer, teardownMongoTestServer } from "./setup";
const expect = chai.expect;

//
// setup
//

app.use("/", userRouter);
before(async () => await setupMongoTestServer());
after(async () => await teardownMongoTestServer());

const newUser = {
  firstName: "John",
  lastName: "Doe",
  username: "johndoe@notreal.com",
  password: "password123",
  address: "123 Main St",
  city: "Exampleville",
  state: "CA",
  zip: "12345",
  phone: "123-456-7890",
};

let cookies: string[];

//
// user signup tests
//

describe("POST /user/signup", () => {
  it("with valid input: successful response & database check", async () => {
    const res = await request(app)
      .post("/signup")
      .send(newUser)
      .expect("Content-Type", /json/)
      .expect("set-cookie", /refreshToken.*accessToken/)
      .expect(200, { msg: "Successful user signup.", authenticated: true })
      .then(async function validateDatabaseEntries(res) {
        const userDb = await UserModel.findOne({ username: newUser.username });
        expect(userDb?.username).to.equal(newUser.username);
        expect(userDb?.firstName).to.equal(newUser.firstName);
        expect(userDb?.lastName).to.equal(newUser.lastName);
        expect(userDb?.address).to.equal(newUser.address);
        expect(userDb?.city).to.equal(newUser.city);
        expect(userDb?.state).to.equal(newUser.state);
        expect(userDb?.zip).to.equal(newUser.zip);
        expect(userDb?.phone).to.equal(
          Number(newUser.phone.toString().replace(/\D/g, "")),
        );
        expect(userDb?.password).to.not.equal(newUser.password);
        expect(userDb?.events).to.be.an("array").that.is.empty;
      });
  });

  it("with existing email address: 400 w/ error msg", async () => {
    await request(app)
      .post("/signup")
      .send(newUser)
      .expect(400)
      .then(res => {
        expect(res.body.msg).to.equal("Failed to validate user data.");
        expect(res.body.errors.length).to.equal(1);
        expect(
          res.body.errors.some((e: any) => {
            return e.msg.includes("Email address already registered.");
          }),
        );
      });
  });
});

//
// user login
//

describe("POST /user/login Tests", () => {
  it("with valid credentials: 200 w/ success msg", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: newUser.username, password: newUser.password })
      .expect("Content-Type", /json/)
      .expect(200, { msg: "Successful user login.", authenticated: true })
      .expect("set-cookie", /refreshToken.*accessToken/);

    // set cookies for future tests
    cookies = res.header["set-cookie"];
  });
});

//
// auth status tests
//

describe("GET /auth-status Tests", () => {
  it("without JWT: authenticated = false", done => {
    request(app)
      .get("/auth-status")
      .expect("Content-Type", /json/)
      .expect(200, { authenticated: false }, done);
  });

  it("with json JWT: authenticated = true", done => {
    request(app)
      .get("/auth-status")
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(200, { authenticated: true }, done);
  });
});

//
// user get tests
//

describe("GET / Tests", () => {
  it("without jwt: 401", done => {
    request(app).get("/").expect("Content-Type", /json/).expect(401, done);
  });

  it("with jwt: 200 & data", done => {
    request(app)
      .get("/")
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(2010, {
        msg: "Successful user get",
        user: { ...newUser, password: 0 },
        done,
      });
  });
});
