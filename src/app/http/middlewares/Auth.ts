import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {ErrorResponse} from "../resources/error.response";

function BearerToken(authorization: string): string | null {
    if (authorization.length && authorization.match(new RegExp('^Bearer '))) {
        return authorization.split(" ")[1];
    }
    return null
}


export async function Auth(req: Request, res: Response, next: NextFunction) {
    const token = BearerToken(req.header("Authorization") as string);
    if (token == null) return new ErrorResponse(res, {
        message: "unauthorized"
    }, 401);

    await verify(token, process.env.PRIVET_KEY as string, async (err: any, payload: any) => {

        if (err) return new ErrorResponse(res, {
            message: "unauthorized"
        }, 401);

        req.user = payload.data;
        return;
    })
    return next()
}
