import {UserModel} from "../../models/user.model";
import {Request, Response} from "express";
import {compareSync} from "bcrypt";

import {JwtPayload, sign, verify} from "jsonwebtoken"

class AuthController {
    async Register(req: Request, res: Response) {
        const {first_name, last_name, user_name, phone, password} = req.body;

        const user = await UserModel.create({
            first_name, last_name, user_name, phone, password
        })

        if (process.env.PRIVET_KEY && process.env.SECRET_KEY) {
            const token = sign({data: user.user_name}, process.env.PRIVET_KEY, {expiresIn: "3 days"});
            const refreshToken = sign({data: user.user_name}, process.env.SECRET_KEY, {expiresIn: "5 days"});
            return res.status(201).json({
                token,refreshToken
            })
        }

        return res.status(400).json({})
    }

    async Login(req: Request, res: Response) {
        const {user_name, password} = req.body;

        const user = await UserModel.findOne({user_name})

        if (user) {
            if (compareSync(password, user.password)) {
                if (process.env.PRIVET_KEY && process.env.SECRET_KEY) {
                    const token = sign({data: user.user_name}, process.env.PRIVET_KEY, {expiresIn: "3 days"});
                    const refreshToken = sign({data: user.user_name}, process.env.SECRET_KEY, {expiresIn: "5 days"});
                    return res.status(200).json({
                        token,refreshToken
                    })
                }

            }
            return res.status(400).json({})
        }
        return res.status(400).json({})
    }

    async RefreshToken(req: Request, res: Response) {

        if (process.env.PRIVET_KEY && process.env.SECRET_KEY) {
            const {token} = req.body;
            if (token) {
                const decodedToken: JwtPayload | string = verify(token, process.env.SECRET_KEY)
                if (typeof decodedToken == "object") {
                    if (typeof decodedToken.exp == "number" && new Date().valueOf() >= decodedToken.exp) {
                        const user_name = decodedToken.data
                        const user = await UserModel.findOne({user_name}, {password: 0})
                        if (user) {
                            const token = sign({data: user.user_name}, process.env.PRIVET_KEY, {expiresIn: "3 days"});
                            const refreshToken = sign({data: user.user_name}, process.env.SECRET_KEY, {expiresIn: "5 days"});
                            return res.status(200).json({
                                token, refreshToken
                            })
                        }
                    }
                }
            }
        }

        return res.status(401).json({})
    }

    async Logout(req: Request, res: Response) {
        return res.status(200).json({})
    }
}

export default new AuthController