import mongoose from "mongoose";
import bcrypt from "bcrypt"
const { Schema } = mongoose

const UserSchema = new Schema({
  user_name: String,
  email: {type: String, unique: true},
  password: {type: String, required: true},
  phone_number: {type: Number, unique: true, required: true},
  wallet: Number,
  reciept: {
    value: Number,
    reciept_date: Date
  },
  request_counter: Number,
  file_path: String,
  request_date: [Date]
})

UserSchema.pre("save", async function(next) {
  const slat = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, slat);
  next()
})

const userSchema = mongoose.model('User', UserSchema)

export default userSchema
