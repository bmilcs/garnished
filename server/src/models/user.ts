import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export type TUserDocument = mongoose.Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  events: string[];
};

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required."],
    length: { min: 1, max: 50 },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
    length: { min: 1, max: 50 },
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required."],
    length: { min: 1, max: 320 },
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    length: { min: 8, max: 50 },
  },
  address: {
    type: String,
    required: [true, "Address is required."],
    length: { min: 1, max: 200 },
  },
  city: {
    type: String,
    required: [true, "City is required."],
    length: { min: 1, max: 100 },
  },
  state: {
    type: String,
    required: [true, "State is required."],
    length: { min: 2, max: 2 },
  },
  zip: {
    type: String,
    required: [true, "Zip code is required."],
    length: { min: 5, max: 5 },
  },
  phone: { type: String, required: [true, "Phone is required."], length: 10 },
  events: [{ type: ObjectId, ref: "Event", required: false }],
});

// hash password before saving to database
UserSchema.pre<TUserDocument>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (err: any) {
    return next(err);
  }
});

// compare supplied password vs. stored password
UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  next: (err: any, isMatch: boolean) => void,
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return next(err, false);
    next(null, isMatch);
  });
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
