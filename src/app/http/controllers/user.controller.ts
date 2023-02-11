import {UserModel} from "../../models/user.model";
import {Request, Response} from "express";

class UserController{
    async Index(req: Request, res: Response) {
        let userEntity = await UserModel.find({});

        return res.json(userEntity)
    }

    async Find(req: Request, res: Response) {
        const {id} = req.params

        const user = await UserModel.findById(id);
        if (user) {
            return res.json(user.fullName())
        }
        return res.json("null")
    }

    async Store() {}

    async Update(req: Request, res: Response) {
        const {id} = req.params
        const {first_name, last_name, user_name, phone} = req.body;

        const user = await UserModel.updateOne({_id: id}, {
            first_name, last_name, user_name, phone
        });
        if (user.upsertedCount) {
            return res.json({})
        }
        return res.json({})
    }

    async Destroy(req: Request, res: Response) {
        const {id} = req.params

        const user = await UserModel.deleteOne({_id: id});
        if (user.deletedCount) {
            return res.json({})
        }
        return res.json({})
    }
}

export default new UserController