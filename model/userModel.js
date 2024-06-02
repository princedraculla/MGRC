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

UserSchema.pre("findeOneAndUpdate", async function (next) {
  const update = this.getUpdate()

  if (update["reciept.value"]) {
    const doctoUpdate = await this.model.findOne(this.getQuery());

    const totalValue = update["reciept.value"].reduce((acc, value) => {
      return acc + value;
    }, 0);

    doctoUpdate.wallet = totalValue;
    await doctoUpdate.save();
  }
  next();
});



const userSchema = mongoose.model("User", UserSchema);

export default userSchema;
