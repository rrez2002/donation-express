import {Request, Response} from "express";
import AuthService from "../../services/auth.service";
import {AuthResponse} from "../resources/auth.response";
import {ErrorResponse} from "../resources/error.response";
import {IUser} from "../../models/user.model";

class AuthController {
    async Register(req: Request, res: Response) {
        try {
            const data: IUser = req.body;

            const response = await AuthService.Register(data)

            return new AuthResponse(res, response)
        }catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }

    async Login(req: Request, res: Response) {
        try {
            const data = req.body;

            const response = await AuthService.Login(data)

            return new AuthResponse(res, response)
        }catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }

    async RefreshToken(req: Request, res: Response) {
        try {
            const {token} = req.body;

            const response = await AuthService.RefreshToken(token)

            return new AuthResponse(res, response)
        }catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }

    async Logout(req: Request, res: Response) {
        return res.status(200).json({})
    }
}

export default new AuthController