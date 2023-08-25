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

// cookies are acquired from login tests & used in future tests
let cookies: string[];

//
// user signup tests
//

describe("User Route: POST /user/signup", () => {
  it("Valid input: 200 with database updates", done => {
    request(app)
      .post("/signup")
      .send(newUser)
      .expect("Content-Type", /json/)
      .expect("set-cookie", /refreshToken.*accessToken/)
      .expect(200, { msg: "Successful user signup.", authenticated: true })
      .then(async function validateDatabaseEntries(res) {
        const user = await UserModel.findOne({ username: newUser.username });
        expect(user?.username).to.equal(newUser.username);
        expect(user?.firstName).to.equal(newUser.firstName);
        expect(user?.lastName).to.equal(newUser.lastName);
        expect(user?.address).to.equal(newUser.address);
        expect(user?.city).to.equal(newUser.city);
        expect(user?.state).to.equal(newUser.state);
        expect(user?.zip).to.equal(newUser.zip);
        expect(user?.password).to.not.equal(newUser.password);
        expect(user?.events).to.be.an("array").that.is.empty;
        expect(user?.phone).to.equal(
          Number(newUser.phone.toString().replace(/\D/g, "")),
        );
        done();
      });
  });

  it("Existing email address: 400 w/ error msg", done => {
    request(app)
      .post("/signup")
      .send(newUser)
      .expect(400)
      .then(async res => {
        expect(res.body.msg).to.equal("Failed to validate user data.");
        expect(res.body.errors.length).to.equal(1);
        expect(
          res.body.errors.some((e: any) => {
            return e.msg.includes("Email address already registered.");
          }),
        );
        done();
      });
  });
});

//
// user login
// * this test acquires the cookies for future tests
//

describe("User Route: POST /user/login", () => {
  it("Valid credentials: 200, success msg & jwt cookies", done => {
    request(app)
      .post("/login")
      .send({ username: newUser.username, password: newUser.password })
      .expect("Content-Type", /json/)
      .expect(200, { msg: "Successful user login.", authenticated: true })
      .expect("set-cookie", /refreshToken.*accessToken/)
      .then(res => {
        // set cookies for future tests
        cookies = res.header["set-cookie"];
        done();
      });
  });
});

//
// auth status tests
//

describe("User Route: GET /auth-status", () => {
  it("Without JWT cookies: authenticated = false", done => {
    request(app)
      .get("/auth-status")
      .expect("Content-Type", /json/)
      .expect(200, { authenticated: false }, done);
  });

  it("With JWT cookies: authenticated = true", done => {
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

describe("User Route: GET /", () => {
  it("Without JWT cookies: 401", done => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(401)
      .then(res => {
        expect(res.body.msg).to.equal("Unauthorized.");
        done();
      });
  });

  it("With JWT cookies: 200 & user data", done => {
    request(app)
      .get("/")
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.msg).to.equal("Successful user get");
        expect(res.body.user).to.be.an("object");
        expect(res.body.user).to.have.property("username");
        expect(res.body.user).to.have.property("firstName");
        expect(res.body.user).to.have.property("lastName");
        expect(res.body.user).to.have.property("address");
        expect(res.body.user).to.have.property("city");
        expect(res.body.user).to.have.property("state");
        expect(res.body.user).to.have.property("zip");
        expect(res.body.user).to.have.property("phone");
        expect(res.body.user).to.have.property("events");
        expect(res.body.user).to.not.have.property("password");
        done();
      });
  });
});
