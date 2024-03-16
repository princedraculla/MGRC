import userSchema from "../model/userModel.js";
//import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";
const register = async (req, res) => {
  try {
    const { phone_number, password, email } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const registeredUser = await userSchema.create({
      phone_number: phone_number,
      password: hashedPassword,
      email: email,
    });
    await registeredUser.save();
    if (!registeredUser) {
      return res.status(400).json({ error: "registeration faild" });
    }
    return res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Registeration Failed becouse ${error.message}` });
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {}
};

const userList = async (req, res) => {
  try {
    const users = await userSchema.find();
    return res.status(200).json({ Data: users });
  } catch (error) {}
};

export { register, userList };
