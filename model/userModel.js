import mongoose from "mongoose";
const { Schema } = mongoose

const UserSchema = new Schema({
  user_name: String,
  email: {type: String, unique: true},
  password: String,
  phone_number: {type: Number, unique: true, index: true},
  wallet: Number,
  reciept: {
    value: Number,
    reciept_date: Date
  },
  request_counter: Number,
  file_path: String,
  request_date: [Date]
})

const userSchema = mongoose.model('User', UserSchema)

export default userSchema
