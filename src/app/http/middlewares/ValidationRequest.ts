import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export function validationRequest(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);

    if(result.isEmpty()){
        return next()
    }
    return res.status(400).json(result)

}
