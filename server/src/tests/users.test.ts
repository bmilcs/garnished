import userRouter from "@/routes/userRouter";
import { AUTH_COOKIES, app, request, test } from "./setup";

app.use("/", userRouter);

//
// auth status tests
//

describe("GET /auth-status Tests", () => {
  test("without JWT: authenticated = false", done => {
    request(app)
      .get("/auth-status")
      .expect("Content-Type", /json/)
      .expect({ authenticated: false })
      .expect(200, done);
  });

  test("with json JWT: authenticated = true", done => {
    request(app)
      .get("/auth-status")
      .set("Cookie", AUTH_COOKIES)
      .expect("Content-Type", /json/)
      .expect({ authenticated: true })
      .expect(200, done);
  });
});

describe("GET / Tests", () => {
  test("without json webtokens: 401", done => {
    request(app).get("/").expect("Content-Type", /json/).expect(401, done);
  });

  // test("with json webtokens > 200", done => {
  //   request(app)
  //     .get("/")
  //     .set("Cookie", AUTH_COOKIES)
  //     .expect("Content-Type", /json/)
  //     .expect(200, done);
  // });
});

//
// examples
//

// test("auth-status > authenticated: true", done => {
//   request(app)
//     .get("/auth-status")
//     .expect("Content-Type", /json/)
//     .expect({ authenticated: false })
//     .expect(200, done);
// });

// test("testing route works", done => {
//   request(app)
//     .post("/test")
//     .type("form")
//     .send({ item: "hey" })
//     .then(() => {
//       request(app)
//         .get("/test")
//         .expect({ array: ["hey"] }, done);
//     });
// });
