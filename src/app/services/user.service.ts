import {User, UserModel} from "../models/user.model";
import { FindByIdDTO, FindByUserNameDTO, UpdateDTO } from "../http/dtos/user.dto";

export default new class UserService{
    async FindById(query:FindByIdDTO):Promise<User> {
        try {
            const user = await UserModel.findById({query}, {
                first_name: 1, last_name: 1, user_name: 1, phone: 1,
            });

            if (!user) return Promise.reject({
                message: "user not found"
            });

            return Promise.resolve(user);
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }

    async FindByUserName(query:FindByUserNameDTO):Promise<User>{
        try {
            const user:User|null = await UserModel.findOne({query},  {
                first_name: 1, last_name: 1, user_name: 1, phone: 1,
            });

            if (!user) return Promise.reject({
                message: "user not found"
            });

            return Promise.resolve(user);
        }catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }

    async Update(query:FindByIdDTO,body:UpdateDTO):Promise<any>{
        try {
            await UserModel.updateOne({query}, {
                $set: body
            });

            return Promise.resolve();
        }catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }

    async Destroy(query:FindByIdDTO):Promise<any>{
        try {
            await UserModel.deleteOne({query});

            return Promise.resolve();
        }catch (e) {
            return Promise.reject({
                message:(e as Error).message
            });
        }
    }
}
