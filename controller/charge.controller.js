import date from "date-and-time";
import userSchema from "../model/userModel.js";


const userCharge = async (req, res) => {
  const { reciept } = req.body;
  const id = req.userId;
  console.log(id);
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
    console.log(req.file.path);
    const userId = req.userId;
   const userWallet = await userSchema.findById(userId)
   console.log(userWallet.wallet);
   console.log(userWallet.email);
   return res.status(200).json({message: req.file})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

export { userCharge, userUpload };
