import {UserModel} from "../../models/user.model";
import {Request, Response} from "express";

class AuthController{
    async Register(req: Request, res: Response){
        const {first_name, last_name , user_name, phone, password} = req.body;

         await UserModel.create({
            first_name,
            last_name ,
            user_name,
            phone,
            password
        })

        res.header("Content-Type","application/json")
        return res.status(201).json({})
    }
    Login(req: Request, res: Response){
    }
    Logout(req: Request, res: Response){
    }
}

export default new AuthController