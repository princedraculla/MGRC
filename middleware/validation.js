import { body, validationResult } from "express-validator";

const userRegisterValidationRules = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .exists()
      .withMessage("user must have real name, required"),
    body("phone_number")
      .isNumeric()
      .notEmpty()
      .exists()
      .withMessage("phone number must be number,required"),
    body("password")
      .isLength({ min: 5 })
      .trim()
      .withMessage("password must be at least five character")
      .exists(),
    body("email")
      .isEmail()
      .withMessage("email must be currect,required")
      .exists(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({error : extractedErrors})
};

export { userRegisterValidationRules, validate };
