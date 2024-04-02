import userSchema from "../model/userModel.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const register = async (req, res) => {
  const { name ,phone_number, password, email } = req.body;
  try {
    const registeredUser = await userSchema.create({
      user_name: name,
      phone_number: phone_number,
      password: password,
      email: email,
    });
    await registeredUser.save();
    const userId = registeredUser._id;
    const registerToken = Jwt.sign({ userId }, process.env.auth_key, {
      expiresIn: 3 * 24 * 60 * 60,
    });

    if (!registeredUser) {
      return res.status(400).json({ error: "registeration faild" });
    }
    res.cookie("jwt", registerToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json({ message: "user registered successfully", token: registerToken });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Registeration Failed becouse ${error.message}` });
  }
};

const login = async (req, res) => {
  const { email, password,  } = req.body;
  try {
    const user = await userSchema.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this Email not found" });
    } else {
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.status(400).json({ message: "password its incorrect" });
      }
      const id = user._id
      const token = Jwt.sign({id}, process.env.auth_key, {
        expiresIn: 3 * 24 * 60 * 60,
      });
      res.cookie("jwt", token, {
        httpOnly: true,
        /* In the provided code snippet, the number `3` is being used as a multiplier to
        calculate the expiration time for the JWT token. */
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({message: "successfully loged in", token: token})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const userList = async (req, res) => {
  try {
    const users = await userSchema.find();
    return res.status(200).json({ Data: users });
  } catch (error) {}
};

export { register, userList, login };
