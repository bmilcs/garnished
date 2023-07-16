import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const EventSchema = new Schema({
  user: [{ type: ObjectId, ref: "User" }],
  date: Date,
  time: String,
  locationDescription: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  guests: Number,
  hours: Number,
  eventType: String,
  needBar: Boolean,
  needTent: Boolean,
  needAlcohol: Boolean,
  needRunningWater: Boolean,
  needRefrigeration: Boolean,
  needDrinkware: Boolean,
  beer: Boolean,
  wine: Boolean,
  specialtyDrinks: Boolean,
  liquorPreferences: String,
});

const EventModel = mongoose.model("Event", EventSchema);

export default EventModel;
