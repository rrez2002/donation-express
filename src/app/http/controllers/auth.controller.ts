import {Request, Response} from "express";
import AuthService from "../../services/auth.service";
import {AuthResponse} from "../resources/auth.response";
import {ErrorResponse} from "../resources/error.response";
import {IUser} from "../../models/user.model";

class AuthController {
    constructor(private readonly authService = AuthService) {}

    Register = async (req: Request, res: Response) => {
        try {
            const data: IUser = req.body;

            const response = await this.authService.Register(data)

            return new AuthResponse(res, response)
        } catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }

    Login = async (req: Request, res: Response) => {
        try {
            const data = req.body;

            const response = await this.authService.Login(data)

            return new AuthResponse(res, response)
        } catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }

    RefreshToken = async (req: Request, res: Response) => {
        try {
            const {token} = req.body;

            const response = await this.authService.RefreshToken(token)

            return new AuthResponse(res, response)
        } catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }

    Logout = async (req: Request, res: Response) => {
        return res.status(200).json({})
    }
}

export default new AuthController