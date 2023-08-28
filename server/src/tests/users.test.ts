import UserModel, { TUserRequestDetails } from "@/models/user";

import chai from "chai";
import request from "supertest";
import {
  app,
  createEvent,
  eventData,
  logoutUser,
  signupUser,
  userData,
} from "./setup";
const expect = chai.expect;

//
// user signup tests
//

describe("User Route: POST /user/signup", () => {
  it("Valid input: 200 with database updates", async () => {
    await request(app)
      .post("/user/signup")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect("set-cookie", /refreshToken.*accessToken/)
      .expect(200, { msg: "Successful user signup.", authenticated: true })
      .then(async () => {
        const user = await UserModel.findOne({ username: userData.username });

        expect(user?.username).to.equal(userData.username);
        expect(user?.firstName).to.equal(userData.firstName);
        expect(user?.lastName).to.equal(userData.lastName);
        expect(user?.address).to.equal(userData.address);
        expect(user?.city).to.equal(userData.city);
        expect(user?.state).to.equal(userData.state);
        expect(user?.zip).to.equal(userData.zip);
        expect(user?.password).to.not.equal(userData.password);
        expect(user?.events).to.be.an("array").that.is.empty;
        expect(user?.phone).to.equal(
          Number(userData.phone.toString().replace(/\D/g, "")),
        );
      });
  });

  it("Existing email address: 400 w/ error", async () => {
    await signupUser(app, userData as TUserRequestDetails);

    await request(app)
      .post("/user/signup")
      .send(userData)
      .expect(400)
      .then(res => {
        expect(res.body.msg).to.equal("Failed to validate user data.");
        expect(res.body.errors.length).to.equal(1);
        expect(res.body.errors[0].msg).to.equal(
          "Email address already registered.",
        );
      });
  });
});

//
// user login
// * this test acquires the cookies for future tests
//

describe("User Route: POST /user/login", async () => {
  it("Valid credentials: 200, success msg & jwt cookies", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);
    await logoutUser(app, cookies);

    await request(app)
      .post("/user/login")
      .send({ username: userData.username, password: userData.password })
      .expect("Content-Type", /json/)
      .expect(200, { msg: "Successful user login.", authenticated: true })
      .expect("set-cookie", /refreshToken.*accessToken/);
  });

  it("Invalid credentials: 401, error msg", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);
    await logoutUser(app, cookies);

    const invalidCredentials = {
      username: userData.username,
      password: "wrongpassword",
    };

    await request(app)
      .post("/user/login")
      .send(invalidCredentials)
      .expect("Content-Type", /json/)
      .expect(401, { msg: "Invalid password.", authenticated: false });
  });
});

//
// auth status tests
//

describe("User Route: GET /auth-status", () => {
  it("Without JWT cookies: authenticated = false", async () => {
    await request(app)
      .get("/user/auth-status")
      .expect("Content-Type", /json/)
      .expect(200, { authenticated: false });
  });

  it("With JWT cookies: authenticated = true", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);
    await logoutUser(app, cookies);

    await request(app)
      .get("/user/auth-status")
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(200, { authenticated: true });
  });
});

//
// user get tests
//

describe("User Route: GET /", () => {
  it("Without JWT cookies: 401", async () => {
    await request(app)
      .get("/user/")
      .expect("Content-Type", /json/)
      .expect(401)
      .then(res => {
        expect(res.body.msg).to.equal("Unauthorized.");
      });
  });

  it("With JWT cookies: 200 & user data", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);
    await logoutUser(app, cookies);

    await request(app)
      .get("/user/")
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
      });
  });
});

//
// user update tests
//

describe("User Route: PATCH /", () => {
  it("Without JWT cookies: 401 unauthorized", async () => {
    await request(app)
      .patch("/user/")
      .expect("Content-Type", /json/)
      .expect(401)
      .then(res => {
        expect(res.body.msg).to.equal("Unauthorized.");
      });
  });

  it("With JWT cookies: 200 & updated user data", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);
    await logoutUser(app, cookies);

    const updatedUser = {
      firstName: "Jane",
      lastName: "Doe",
      address: "123 Main St",
      username: "testuser@aol.com",
      city: "Exampleville",
      state: "CA",
      zip: "12345",
      phone: "123-456-7890",
    };

    await request(app)
      .patch("/user/")
      .set("Cookie", cookies)
      .send(updatedUser)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(async res => {
        const user = await UserModel.findOne({
          username: updatedUser.username,
        });

        expect(res.body.msg).to.equal("Successful user update.");
        expect(user?.username).to.equal(updatedUser.username);
        expect(user?.firstName).to.equal(updatedUser.firstName);
        expect(user?.lastName).to.equal(updatedUser.lastName);
        expect(user?.address).to.equal(updatedUser.address);
        expect(user?.city).to.equal(updatedUser.city);
        expect(user?.state).to.equal(updatedUser.state);
        expect(user?.zip).to.equal(updatedUser.zip);
        expect(user?.phone).to.equal(
          Number(updatedUser.phone.toString().replace(/\D/g, "")),
        );
      });
  });
});

//
// user logout tests
//
// note: done() syntax is causing these tests to hang for no obvious reason
// async / await syntax works fine
//

describe("User Route: DELETE /logout", () => {
  it("Without JWT cookies: 401 unauthorized", async () => {
    await request(app)
      .delete("/user/logout")
      .expect("Content-Type", /json/)
      .expect(401, { msg: "Unauthorized." });
  });

  it("With JWT cookies: 200 & success msg", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);
    await logoutUser(app, cookies);

    await request(app)
      .delete("/user/logout")
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(200, { msg: "Successful user logout." })
      .then(res => {
        expect(res.header["set-cookie"][0]).to.include("accessToken=;");
        expect(res.header["set-cookie"][1]).to.include("refreshToken=;");
      });
  });
});

//
// user delete tests
//

describe("User Route: DELETE /", () => {
  it("Without JWT cookies: 401 unauthorized", async () => {
    await request(app)
      .delete("/user")
      .expect("Content-Type", /json/)
      .expect(401, { msg: "Unauthorized." });
  });

  it("With JWT cookies & no existing Events: 200, success msg & database check", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);

    await request(app)
      .delete("/user")
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(200, { msg: "Successful user delete.", deleted: true })
      .then(async res => {
        const user = await UserModel.findOne({ username: userData.username });
        expect(user).to.equal(null);
      });
  });

  it("With JWT cookies & 1 Events: ...", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);
    await createEvent(app, cookies, eventData);

    await request(app)
      .delete("/user")
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(400, { msg: "User has existing events.", deleted: false })
      .then(async res => {
        const user = await UserModel.findOne({ username: userData.username });
        expect(user).to.not.equal(null);
        expect(user?.events).to.be.an("array").that.is.not.empty;
      });
  });
});
