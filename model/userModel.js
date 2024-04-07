import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const UserSchema = new Schema({
  user_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone_number: { type: Number, unique: true, required: true },
  wallet: { type: Number, default: 0 },
  reciept: {
    value: [Number],
    reciept_date: [Date],
  },
  request_counter: {type: Number, default: 0},
  file_path: [String],
});

UserSchema.pre("save", async function (next) {
  const slat = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, slat);
  next();
});

const userSchema = mongoose.model("User", UserSchema);

export default userSchema;
