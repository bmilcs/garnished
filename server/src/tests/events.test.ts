import EventModel from "@/models/event";
import { TUserRequestDetails } from "@/models/user";
import {
  app,
  createEvent,
  eventData,
  request,
  signupUser,
  userData,
} from "@/tests/setup";
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
      .send({ ...eventData, guests: "A lot" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.msg).to.equal("Failed to validate event data.");
        expect(res.body.errors).to.be.an("array");
        expect(res.body.errors[0].msg).to.equal(
          "A valid number of guests is required: numbers only.",
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
        expect(res.body).to.contain({ msg: "Successful create event." });
        expect(res.body.eventId).to.be.a("string");
      });
  });
});

//
// event delete
//

describe("Event Route: DELETE /event/:id", () => {
  it("Missing JWT cookies: 401 Unauthorized", async () => {
    await request(app)
      .delete("/event/123")
      .expect("Content-Type", /json/)
      .expect(401)
      .then(res => {
        expect(res.body.msg).to.equal("Unauthorized.");
      });
  });

  it("With JWT cookies & invalid eventId: 404", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);

    await request(app)
      .delete("/event/123")
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(404)
      .then(res => {
        expect(res.body.msg).to.equal("Event not found.");
      });
  });

  it("With JWT cookies & valid eventId: 200 & database check", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);
    const eventId = await createEvent(app, cookies, eventData);

    await request(app)
      .delete(`/event/${eventId}`)
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(200, { msg: "Successful event delete.", deleted: true })
      .then(async res => {
        // check that event was deleted from database
        const event = await EventModel.findById(eventId);
        expect(event).to.equal(null);
      });
  });
});

//
// event get
//

describe("Event Route: GET /event/:id", () => {
  it("Missing JWT cookies: 401 Unauthorized", async () => {
    await request(app)
      .get("/event/123")
      .expect("Content-Type", /json/)
      .expect(401)
      .then(res => {
        expect(res.body.msg).to.equal("Unauthorized.");
      });
  });

  it("With JWT cookies & invalid eventId: 404", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);

    await request(app)
      .get("/event/123")
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(404)
      .then(res => {
        expect(res.body.msg).to.equal("Event not found.");
      });
  });

  it("With JWT cookies & valid eventId: 200 & event data", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);
    const eventId = await createEvent(app, cookies, eventData);

    await request(app)
      .get(`/event/${eventId}`)
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.event).to.be.an("object");
        expect(res.body.event.time).to.equal(eventData.time);
        expect(res.body.event.address).to.equal(eventData.address);
      });
  });
});

//
// event update
//

describe("Event Route: PATCH /event/:id", () => {
  it("Missing JWT cookies: 401 Unauthorized", async () => {
    await request(app)
      .patch("/event/123")
      .expect("Content-Type", /json/)
      .expect(401)
      .then(res => {
        expect(res.body.msg).to.equal("Unauthorized.");
      });
  });

  it("With JWT cookies & invalid eventId: 404", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);

    await request(app)
      .patch("/event/123")
      .set("Cookie", cookies)
      .expect("Content-Type", /json/)
      .expect(404)
      .then(res => {
        expect(res.body.msg).to.equal("Event not found.");
      });
  });

  it("With JWT cookies & valid eventId & invalid data: 400", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);
    const eventId = await createEvent(app, cookies, eventData);

    await request(app)
      .patch(`/event/${eventId}`)
      .set("Cookie", cookies)
      .send({ ...eventData, time: "" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.msg).to.equal("Failed to validate event data.");
        expect(res.body.errors).to.be.an("array");
        expect(res.body.errors[0].msg).to.equal("A valid time is required.");
      });
  });

  it("With JWT cookies & valid eventId & valid data: 200 & database check", async () => {
    const cookies = await signupUser(app, userData as TUserRequestDetails);
    const eventId = await createEvent(app, cookies, eventData);

    await request(app)
      .patch(`/event/${eventId}`)
      .set("Cookie", cookies)
      .send({ ...eventData, address: "321 Updated Dr." })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(async res => {
        expect(res.body).to.contain({ msg: "Successful event update." });
        expect(res.body.updated).to.equal(true);

        // check that event was updated in database
        const event = await EventModel.findById(eventId);
        expect(event).to.be.an("object");
        expect(event?.address).to.equal("321 Updated Dr.");
      });
  });
});
