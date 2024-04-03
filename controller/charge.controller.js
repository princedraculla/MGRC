import date from "date-and-time"
import userSchema from "../model/userModel.js"


const userCharge = async (req, res) => {
    console.log(req.body);
    const {reciept} = req.body;
    const id = req.userId
    try {
        const userExist = await userSchema.findById({
            _id: id
        })
        console.log(userExist);
        const userReciept = await userSchema.create({
            
            reciept: {
                value: reciept,
                reciept_date: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')
            }
        })
    } catch (error) {
        console.log(error);
    }
}



export {userCharge}