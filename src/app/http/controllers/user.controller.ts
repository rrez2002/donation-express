import {Request, Response} from "express";
import UserService from "../../services/user.service";

class UserController{
    async Me(req: Request, res: Response) {
        const user = req.user

        return res.status(200).json(user)
    }

    async Update(req: Request, res: Response) {
        try {
            let id = req.user._id
            const body = req.body;

            if (id){
                await UserService.Update(id, body)

                return res.status(200).json({
                    message: "update user success"
                });
            }
            return res.status(400).json({
                message: "user not found"
            })
        }catch (e) {
            return res.status(400).json(e)
        }
    }

    async Destroy(req: Request, res: Response) {
        try {
            let id = req.user._id

            if (id){
                await UserService.Destroy(id)

                return res.status(200).json({
                    message: "delete user success"
                });
            }
            return res.status(400).json({
                message: "user not found"
            })
        }catch (e) {
            return res.status(400).json(e)

        }
    }
}

export default new UserController