import userSchema from "../model/userModel.js";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()




const register = async (req, res) => {
  const { phone_number, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const registeredUser = await userSchema.create({
      phone_number: phone_number,
      password: hashedPassword,
      email: email,
    });
    await registeredUser.save();
    const userId = registeredUser._id
    const registerToken = Jwt.sign({userId}, process.env.auth_key, {
      expiresIn: 3 * 24 * 60 * 60 
    })
    
    if (!registeredUser) {
      return res.status(400).json({ error: "registeration faild" });
    }
    res.coockie('jwt', registerToken, { httpOnly: true, maxAge:  3 * 24 * 60 * 60 * 1000})
    return res.status(201).json({ message: "user registered successfully", token: registerToken });
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
