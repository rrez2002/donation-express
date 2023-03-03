import {JsonResponse} from "./response";
import {Response} from "express";

export type TAuthResponse = {
    token: string,
    refreshToken: string
}
export class AuthResponse extends JsonResponse<TAuthResponse>{
    constructor(
        public res: Response,
        public data: TAuthResponse,
        public status: number = 200,
    ) {
        super(res, data, status);
    }
}