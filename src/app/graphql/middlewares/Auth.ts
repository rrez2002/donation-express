import {Request} from "express";
import {verify} from "jsonwebtoken";

function BearerToken(authorization: string): string | null {
    if (authorization.length && authorization.match(new RegExp('^Bearer '))) {
        return authorization.split(" ")[1];
    }
    return null
}


export async function AuthGraphQL(req: Request) {
    const token = BearerToken(req.headers.authorization as string);
    if (token == null) throw "unauthorized";

    await verify(token, process.env.PRIVET_KEY as string, async (err: any, payload: any) => {

        if (err) throw {
            message: "unauthorized"
        };

        req.user = payload.data;
        return;
    })
}
