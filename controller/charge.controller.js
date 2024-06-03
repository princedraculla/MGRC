import date from "date-and-time";
import userSchema from "../model/userModel.js";

const userCharge = async (req, res) => {
  const { reciept } = req.body;
  const id = req.userId;
  console.log(id);
  try {
    const charged = await userSchema.findOneAndUpdate(
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

    if (charged) {
      const charges = await userSchema.findById({ _id: id });
      const totalMoney = charges.reciept.value.reduce(
        (acc, value) => acc + value,
        0
      );
      const moneyInWallet = await userSchema.findOneAndUpdate(
        { _id: id },
        { wallet: totalMoney }
      );
      console.log(moneyInWallet);
      return res.status(201).json({
        msg: `success opration your account has: ${moneyInWallet.wallet} `,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const userUpload = async (req, res) => {
  try {
    const id = req.userId;
    console.log(id);
    const userWallet = await userSchema.findById(id);
    if (userWallet.wallet >= 10000) {
      console.log(req.file);
      const uploadedFile = await userSchema.updateOne(
        { _id: id },
        {
          $push: { file_path: req.file.path },
        }
      );
      if (
        uploadedFile.acknowledged === true &&
        uploadedFile.modifiedCount === 1
      ) {
        const minusMoney = await userSchema.updateOne(
          { _id: id },
          {
            $inc: {
              wallet: -10000,
            },
            $push: {
              "reciept.value": -10000,
            },
          }
        );
        console.log(minusMoney.modifiedCount);
      }
      return res.status(200).json({ message: req.file.filename });
    } else {
      return res
        .status(403)
        .json({ message: "please! first charge account then try agian" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

export { userCharge, userUpload };
