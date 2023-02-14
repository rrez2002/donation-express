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
                    if(typeof decodedToken.exp == "number" && new Date().valueOf() >= decodedToken.exp) {
                        const user_name = decodedToken.data
                        const user = await UserModel.findOne({user_name},{user_name:1})
                        if (user){
                            req.user = user;
                            return next()
                        }
                    }
                }
            }
        }
    }

    return res.status(401).json({})

}
