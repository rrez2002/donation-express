import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";

function BearerToken(authorization: string): string | null {
    if (authorization.match(new RegExp('^Bearer '))) {
        return authorization.split(" ")[1];
    }
    return null
}


export async function Auth(req: Request, res: Response, next: NextFunction) {
    const token = BearerToken(req.header("Authorization") as string);
    if (token == null) return res.status(401).json({
        message: "unauthorized"
    })

    await verify(token, process.env.PRIVET_KEY as string, async (err: any, payload: any) => {

        if (err) return res.status(401).json({
            message: "unauthorized"
        })

        req.user = payload.data;
        return;
    })
    return next()
}
