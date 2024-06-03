import mongoose, { set } from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const UserSchema = new Schema({
  user_name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  phone_number: { type: Number, unique: true },
  wallet: { type: Number, default: 0 },
  reciept: {
    value: [Number],
    reciept_date: [Date],
  },
  request_counter: { type: Number, default: 0 },
  file_path: [String],
});

const userSchema = mongoose.model("User", UserSchema);

export default userSchema;
