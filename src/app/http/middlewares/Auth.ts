import {NextFunction, Request, Response} from "express";
import {JwtPayload, verify} from "jsonwebtoken";
import {UserModel} from "../../models/user.model";

export async function Auth(req: Request, res: Response, next: NextFunction) {

    const authorization = req.header("Authorization")

    if (authorization){
        const token = authorization.split(" ")?.[1];
        if (process.env.PRIVET_KEY){
            if (token){
                const decodedToken : JwtPayload | string  = verify(token,process.env.PRIVET_KEY)
                if (typeof decodedToken == "object"){
                    const user_name = decodedToken.data
                    const user = await UserModel.findOne({user_name},{password:0})
                    if (user){
                        return next()
                    }
                }
            }
        }
    }

    return res.status(400).json({})

}
