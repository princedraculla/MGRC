import date from "date-and-time";
import userSchema from "../model/userModel.js";

const userCharge = async (req, res) => {
  const { reciept } = req.body;
  const id = req.userId;
  try {
    const userExist = await userSchema.findById({
      _id: id,
    });
    const userReciept = await userSchema.updateOne({
      where: {
        _id: id,
      },

      reciept: {
        value: reciept,
        reciept_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
      },
    });
    console.log(userReciept);
    return res.status(201).json("success");
  } catch (error) {
    console.log(error);
  }
};

export { userCharge };
