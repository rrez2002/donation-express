import {UserModel} from "../../models/user.model";
import {Request, Response} from "express";

class UserController{
    async Me(req: Request, res: Response) {
        const user = req.user

        return res.status(200).json(user)
    }

    async Update(req: Request, res: Response) {
        let id = req.user._id
        //todo: validate
        const body = req.body;

        await UserModel.updateOne({_id: id}, body);

        return res.status(200).json({
            message: "update user success"
        });
    }

    async Destroy(req: Request, res: Response) {
        let id = req.user._id

        await UserModel.deleteOne({_id: id});

        return res.status(200).json({
            message: "delete user success"
        });
    }
}

export default new UserController