import { body } from "express-validator";

const inputValidation = async (req, res, next) => {
  const { user_name, password, email, phone_number } = req.body;

  body(user_name).isString().isLength({ min: 3, max: 40 }).notEmpty()
  body(password).notEmpty()

  next();
};


export default inputValidation