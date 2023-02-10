import {UserModel} from "../../models/user.model";
import {Request, Response} from "express";
import {hashSync} from "bcrypt";

class AuthController{
    async Register(req: Request, res: Response){
        const {first_name, last_name , user_name, phone, password} = req.body;

         const user = await UserModel.create({
            first_name,
            last_name ,
            user_name,
            phone,
            password: hashSync(password, 10)
        })

        return res.status(201).json(user)
    }
    Login(req: Request, res: Response){
    }
    Logout(req: Request, res: Response){
    }
}

export default new AuthController