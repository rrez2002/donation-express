import {NextFunction, Request, Response} from "express";
import {JwtPayload, verify} from "jsonwebtoken";
import {UserModel} from "../../models/user.model";

function BearerToken(authorization: string) : string | null {
    if (authorization.match(new RegExp('^Bearer '))){
        return authorization.split(" ")[1];
    }
    return null
}


export async function Auth(req: Request, res: Response, next: NextFunction) {

    const authorization = req.header("Authorization")

    if (authorization){
        if (process.env.PRIVET_KEY){
            const token = BearerToken(authorization);
            if (token){
                const decodedToken : JwtPayload | string  = verify(token,process.env.PRIVET_KEY)
                if (typeof decodedToken == "object"){
                    if(typeof decodedToken.exp == "number" && new Date().valueOf() >= decodedToken.exp) {
                        const user_name = decodedToken.data
                        const user = await UserModel.findOne({user_name},{password:0})
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
