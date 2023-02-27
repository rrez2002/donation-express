import {IUser, UserModel} from "../models/user.model";
import {JwtPayload, sign, verify} from "jsonwebtoken";
import {compareSync} from "bcrypt";
import {RedisClient} from "../../utils/redis";
import {AuthResponse} from "../../interfaces/Auth.interface";

export default new class AuthService{
    async Register(userData:IUser):Promise<AuthResponse | any>{
        try {
            const user = await UserModel.create(userData)

            if (process.env.PRIVET_KEY && process.env.SECRET_KEY) {
                const token = sign({data: user.user_name}, process.env.PRIVET_KEY, {expiresIn: "3 days"});
                const refreshToken = sign({data: user.user_name}, process.env.SECRET_KEY, {expiresIn: "5 days"});

                return Promise.resolve({
                    token,
                    refreshToken
                });
            }
        }catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }

    async Login(user_name:string,password:string):Promise<AuthResponse|any>{
        try {
            const user = await UserModel.findOne({user_name})

            if (user) {
                if (compareSync(password, user.password)) {
                    if (process.env.PRIVET_KEY && process.env.SECRET_KEY) {
                        const token = sign({data: user.user_name}, process.env.PRIVET_KEY, {expiresIn: "3 days"});
                        const refreshToken = sign({data: user.user_name}, process.env.SECRET_KEY, {expiresIn: "5 days"});
                        await RedisClient.setEx(user_name, 3600* 24 * 5,refreshToken)

                        return Promise.resolve({
                            token,
                            refreshToken
                        });
                    }
                }
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

    async RefreshToken(token:string):Promise<AuthResponse|any>{
        try {
            if (process.env.PRIVET_KEY && process.env.SECRET_KEY) {
                const decodedToken: JwtPayload | string = verify(token, process.env.SECRET_KEY)

                if (typeof decodedToken == "object") {
                    if (typeof decodedToken.exp == "number" && new Date().valueOf() >= decodedToken.exp) {
                        const user_name = decodedToken.data
                        const refreshToken = await RedisClient.get(user_name)
                        if (token == refreshToken) {
                            const user = await UserModel.findOne({user_name}, {password: 0})
                            if (user) {
                                const token = sign({data: user.user_name}, process.env.PRIVET_KEY, {expiresIn: "3 days"});
                                const refreshToken = sign({data: user.user_name}, process.env.SECRET_KEY, {expiresIn: "5 days"});
                                await RedisClient.setEx(user_name, 3600 * 24 * 5, refreshToken)

                                return Promise.resolve({
                                    token, refreshToken
                                });
                            }
                        }
                    }
                }
            }
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