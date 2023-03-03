import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {JsonResponse} from "../resources/response";

export function validationRequest(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);

    if(result.isEmpty()){
        return next()
    }
    return new JsonResponse(res, result, 400);
}
