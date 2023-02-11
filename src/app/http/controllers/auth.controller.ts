import {UserModel} from "../../models/user.model";
import {Request, Response} from "express";
import {compareSync} from "bcrypt";

import {sign} from "jsonwebtoken"

class AuthController {
    async Register(req: Request, res: Response) {
        const {first_name, last_name, user_name, phone, password} = req.body;

        const user = await UserModel.create({
            first_name, last_name, user_name, phone, password
        })

        if (process.env.PRIVET_KEY){
            const token = sign(user, process.env.PRIVET_KEY)
            return res.status(201).json({
                token:token
            })
        }

        return res.status(400).json({})
    }

    async Login(req: Request, res: Response) {
        const {user_name, password} = req.body;

        const user = await UserModel.findOne({user_name})

        if (user) {
            if (compareSync(password, user.password)) {
                if (process.env.PRIVET_KEY){
                    const token = sign(user.user_name, process.env.PRIVET_KEY)
                    return res.status(200).json({
                        user,
                        token
                    })
                }

            }
            return res.status(400).json({})
        }
        return res.status(400).json({})
    }

    Logout(req: Request, res: Response) {
    }
}

export default new AuthController