import { body } from "express-validator";

const inputValidation = async (req, res, next) => {
  const { name, password, email, phone_number } = req.body;
  console.log(req.body);

  body(name).isString().isLength({ min: 3, max: 40 }).notEmpty();
  body(password).notEmpty();
  body(email).isEmail().notEmpty().isString();
  body(phone_number).isInt().notEmpty();

  next();
};

export default inputValidation;
