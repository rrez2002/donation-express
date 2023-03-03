import {IUser, UserModel} from "../models/user.model";
import {sign, verify} from "jsonwebtoken";
import {RedisClient} from "../../utils/redis";
import UserService from "./user.service";
import VerifyPassword from "../../utils/password";
import {TAuthResponse} from "../http/resources/auth.response";

export default new class AuthService{
    async Register(userData:Omit<IUser, "_id">):Promise<TAuthResponse>{
        try {
            const user = await UserModel.create(userData)

            const token = sign({data: user}, process.env.PRIVET_KEY as string, {expiresIn: "3 days"});
            const refreshToken = sign({data: user}, process.env.SECRET_KEY as string, {expiresIn: "5 days"});

            return Promise.resolve({
                token,
                refreshToken
            });
        }catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }

    async Login(userData: Pick<IUser, "user_name" | "password">):Promise<TAuthResponse>{
        try {
            if (await VerifyPassword(userData.user_name, userData.password)) {
                const user = await UserService.FindByUserName(userData.user_name)
                const token = sign({data: user}, process.env.PRIVET_KEY as string, {expiresIn: "3 days"});
                const refreshToken = sign({data: user}, process.env.SECRET_KEY as string, {expiresIn: "5 days"});
                await RedisClient.setEx(userData.user_name, 3600 * 24 * 5, refreshToken)

                return Promise.resolve({
                    token, refreshToken
                });
            }
            return Promise.reject({
                message: "invalid username or password"
            });
        }catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }

    async RefreshToken(token:string):Promise<TAuthResponse>{
        try {

            let tokens: TAuthResponse = {
                refreshToken:"",
                token:""
            };

            await verify(token, process.env.PRIVET_KEY as string,async (err: any, payload: any) => {

                if (err) return Promise.reject({
                    message: "invalid token"
                });

                const refreshToken = await RedisClient.get(payload.data.user_name)
                if (token == refreshToken) {
                    const user = await UserService.FindById(payload.data._id)
                    if (user) {
                        const token = sign({data: user}, process.env.PRIVET_KEY as string, {expiresIn: "3 days"});
                        const refreshToken = sign({data: user}, process.env.SECRET_KEY as string, {expiresIn: "5 days"});
                        await RedisClient.setEx(user.user_name, 3600 * 24 * 5, refreshToken)

                        return tokens = {
                            token,
                            refreshToken
                        }
                    }
                }
            })

            if (!tokens.token || !tokens.refreshToken) return Promise.resolve(tokens);

            return Promise.reject({
                message: "invalid token"
            });

        } catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }
}