import {UserModel} from "../../models/user.model";
import {Request, Response} from "express";

class AuthController{
    Register(req: Request, res: Response){
        res.json(req.body)
    }
    Login(req: Request, res: Response){
    }
    Logout(req: Request, res: Response){
    }
}

export default new AuthController