import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export type EventDocument = mongoose.Document & {
  user: string;
  date: Date;
  time: string;
  locationDescription: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  guests: number;
  hours: number;
  eventType: string;
  needBar: boolean;
  needTent: boolean;
  needAlcohol: boolean;
  needRunningWater: boolean;
  needRefrigeration: boolean;
  needDrinkware: boolean;
  beer: boolean;
  wine: boolean;
  specialtyDrinks: boolean;
  liquorPreferences: string;
};

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
