import date from "date-and-time";
import userSchema from "../model/userModel.js";

const userCharge = async (req, res) => {
  const { reciept } = req.body;
  const id = req.userId;
  try {
    const charged = await userSchema.updateOne(
      { _id: id },
      {
        $push: {
          "reciept.value": reciept,
          "reciept.reciept_date": date.format(
            new Date(),
            "YYYY/MM/DD HH:mm:ss"
          ),
        },
      }
    );

    return res.status(201).json({ msg: `success ${charged}` });
  } catch (error) {
    console.log(error);
  }
};

export { userCharge };
