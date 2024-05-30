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

const userUpload = async (req, res) => {
  try {
    const userId = req.userId;
    const userCanUpload = await userSchema.findById({ _id: userId });
    if (!userCanUpload.reciept.value > 1000) {
      return res.status(403).json({
        msg: "you dont have enough money for this opration!... first charge your account",
      });
    } else {
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

export { userCharge, userUpload };
