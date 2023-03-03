import {JsonResponse, messageResponse} from "./response";
import {Response} from "express";

export class ErrorResponse extends JsonResponse<messageResponse>{
    constructor(
        public res: Response,
        public data: messageResponse,
        public status: number = 400,
    ) {
        super(res, data, status);
    }
}