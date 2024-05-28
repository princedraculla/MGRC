import Jwt, { decode } from "jsonwebtoken";
import userSchema from "../model/userModel.js";
import dotenv from "dotenv";
dotenv.config();
const verifyToken = async (req, res, next) => {
  const token = req.auth || req.headers.authorization;
  const validToken = token.replace(/^Bearer\s/, '')  
  try {
    if (validToken) {
       Jwt.verify(validToken, process.env.auth_key, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.locals.user = null;
          return res.status(400).json({ message: err.message });
        } else {
          let user = await userSchema.findById(decodedToken.id);
          req.userId = decodedToken.id;
          res.locals.user = user;
          next();
        }
      });
    } else {
      console.log("there is no token first login");
      res.locals.user = null;
      return res.status(400).json({
        message: "token not found! be sure you sign up and sighn in!!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: error.messagep });
  }
};

export default verifyToken;
