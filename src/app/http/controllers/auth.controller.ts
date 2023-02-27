import {Request, Response} from "express";
import AuthService from "../../services/auth.service";

class AuthController {
    async Register(req: Request, res: Response) {
        try {
            const {first_name, last_name, user_name, phone, password} = req.body;

            const response = await AuthService.Register({first_name, last_name, user_name, phone, password})

            return res.status(201).json(response);
        }catch (e) {
            return res.status(400).json(e)
        }
    }

    async Login(req: Request, res: Response) {
        try {
            const {user_name, password} = req.body;

            const response = await AuthService.Login(user_name, password)

            return res.status(200).json(response)
        }catch (e) {
            return res.status(400).json(e)
        }
    }

    async RefreshToken(req: Request, res: Response) {
        try {
            const {token} = req.body;

            const response = await AuthService.RefreshToken(token)

            return res.status(200).json(response)
        }catch (e) {
            return res.status(400).json(e)
        }
    }

    async Logout(req: Request, res: Response) {
        return res.status(200).json({})
    }
}

export default new AuthController