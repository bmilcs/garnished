import { TUserRequestDetails } from "@/models/user";
import { app, eventData, request, signupUser, userData } from "@/tests/setup";
import chai from "chai";
const expect = chai.expect;

//
// event create
//

describe("Event Route: POST /event/", () => {
  it("Missing JWT cookies: 401 Unauthorized", async () => {
    await request(app)
      .post("/event")
      .expect("Content-Type", /json/)
      .expect(401)
      .then(res => {
        expect(res.body.msg).to.equal("Unauthorized.");
      });
  });

  it("With JWT cookies & invalid data: 400", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);

    await request(app)
      .post("/event")
      .set("Cookie", cookies)
      .send({ ...eventData, beer: "yes" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.msg).to.equal("Failed to validate event data.");
        expect(res.body.errors).to.be.an("array");
        expect(res.body.errors[0].msg).to.equal(
          "A valid beer need is required.",
        );
      });
  });

  it("With JWT cookies & valid data: 200 & eventId", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);

    await request(app)
      .post("/event")
      .set("Cookie", cookies)
      .send(eventData)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.msg).to.equal("Successful create event.");
        expect(res.body.eventId).to.be.a("string");
      });
  });
});

//
// event delete
//

//
// event get
//

//
// event update
//
