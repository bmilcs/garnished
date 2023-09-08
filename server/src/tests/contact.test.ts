import { app, request } from "@/tests/setup";
import { expect } from "chai";

describe("Contact Route: POST /contact", () => {
  it("Invalid e-mail: 400 w/ error message", async () => {
    await request(app)
      .post("/contact")
      .send({
        name: "test",
        email: "test",
        message: "test",
      })
      .expect(400)
      .then(result => {
        console.log(result.body);
        expect(result.body.msg).to.equal(
          "Failed to validate contact form data.",
        );
        expect(result.body.errors).to.be.an("array");
        expect(result.body.errors[0].msg).to.equal("Email address is invalid.");
      });
  });

  it("Valid data: 400 OK & message ", async () => {
    await request(app)
      .post("/contact")
      .send({
        name: "test",
        email: "test@garnished.com",
        message: "test",
      })
      .expect(200)
      .then(result => {
        expect(result.body.msg).to.equal("successful contact form submission");
      });
  });
});
