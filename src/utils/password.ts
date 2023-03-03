import {UserModel} from "../app/models/user.model";
import {compareSync} from "bcrypt";

 const VerifyPassword = async (user_name: string, password: string): Promise<boolean> =>{
    const user = await UserModel.findOne({user_name}, {
        password: 1,
    });
    if (user && compareSync(password, user.password)) return Promise.resolve(true)
    return Promise.resolve(false)

}

export default VerifyPassword