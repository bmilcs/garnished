import mongoose, { ObjectId, Types } from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export type TEventRequestDetails = {
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
  needDrinkware: boolean;
  beer: boolean;
  wine: boolean;
  specialtyDrinks: boolean;
  liquorPreferences: string;
  additionalInfo: string;
};

export type TEventDocument = mongoose.Document &
  TEventRequestDetails & {
    user: Types.ObjectId;
  };

const EventSchema = new Schema({
  user: { type: ObjectId, ref: "User", required: true },
  date: { type: Date, required: true, isLength: { min: 10, max: 10 } },
  time: { type: String, required: true, isLength: { min: 5, max: 5 } },
  locationDescription: {
    type: String,
    required: true,
    isLength: { min: 10, max: 250 },
  },
  address: { type: String, required: true, isLength: { min: 1, max: 200 } },
  city: { type: String, required: true, isLength: { min: 1, max: 100 } },
  state: { type: String, required: true, isLength: { min: 2, max: 2 } },
  zip: { type: String, required: true, isLength: { min: 5, max: 5 } },
  guests: { type: Number, required: true, isLength: { min: 1, max: 10 } },
  hours: { type: Number, required: true, isLength: { min: 1, max: 2 } },
  eventType: { type: String, required: true, isLength: { min: 1, max: 200 } },
  needBar: { type: Boolean, required: true },
  needTent: { type: Boolean, required: true },
  needAlcohol: { type: Boolean, required: true },
  needDrinkware: { type: Boolean, required: true },
  beer: { type: Boolean, required: true },
  wine: { type: Boolean, required: true },
  specialtyDrinks: { type: Boolean, required: true },
  liquorPreferences: {
    type: String,
    required: false,
    isLength: { min: 1, max: 300 },
  },
  additionalInfo: {
    type: String,
    required: false,
    isLength: { min: 1, max: 1000 },
  },
});

const EventModel = mongoose.model("Event", EventSchema);

export default EventModel;
