import {UserModel} from "../models/user.model";
import {verify} from "jsonwebtoken";
import {RedisClient} from "../../utils/redis";
import UserService from "./user.service";
import  {VerifyPassword , GenerateJwtToken, GenerateRefreshToken } from "../../utils/password";
import {TAuthResponse} from "../http/resources/auth.response";
import { LoginDTO, RegisterDTO } from "../http/dtos/auth.dto";

export default new class AuthService{
    async Register(userData:RegisterDTO):Promise<TAuthResponse>{
        try {
            const user = await UserModel.create(userData)

            const token = await GenerateJwtToken(user);
            const refreshToken = await GenerateRefreshToken(user.user_name)

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

    async Login(userData: LoginDTO):Promise<TAuthResponse>{
        try {
            if (await VerifyPassword(userData.user_name, userData.password)) {
                const user = await UserService.FindByUserName(userData)
                
                const token = await GenerateJwtToken(user);
                const refreshToken = await GenerateRefreshToken(user.user_name)

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

                const refreshToken = await RedisClient.get(payload.data)
                if (token == refreshToken) {
                    const user = await UserService.FindByUserName(payload.data)
                    if (user) {
                        const token = await GenerateJwtToken(user);
                        const refreshToken = await GenerateRefreshToken(user.user_name)

                        return tokens = {
                            token,
                            refreshToken
                        }
                    }
                }
            })

            if (!tokens.token || !tokens.refreshToken) return Promise.reject({
                message: "invalid token"
            });

            return Promise.resolve(tokens);

        } catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }
}