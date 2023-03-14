import {UserModel} from "../app/models/user.model";
import {compareSync} from "bcrypt";
import {sign} from "jsonwebtoken";
import { RedisClient } from "./redis";
import { User } from "../app/models/user.model";

const VerifyPassword = async (user_name: string, password: string): Promise<boolean> =>{
    const user = await UserModel.findOne({user_name}, {
        password: 1,
    });
    if (user && compareSync(password, user.password)) return Promise.resolve(true)
    return Promise.resolve(false)

}

const GenerateJwtToken = async(data:object) => {
    return sign({data}, process.env.PRIVET_KEY as string, {expiresIn: "3 days"})
}

const GenerateRefreshToken = async(data:User) => {
    const refreshToken=  sign({data}, process.env.SECRET_KEY as string, {expiresIn: "5 days"});
    await RedisClient.setEx(data.user_name, 3600 * 24 * 5, refreshToken);
    return  refreshToken;
}

export {
    VerifyPassword,
    GenerateJwtToken,
    GenerateRefreshToken
}