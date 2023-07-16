import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  events: [{ type: ObjectId, ref: "Event" }],
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
