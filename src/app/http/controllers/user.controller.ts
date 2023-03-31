import {Request, Response} from "express";
import UserService from "../../services/user.service";
import {UserResponse} from "../resources/user.response";
import {ErrorResponse} from "../resources/error.response";
import {JsonResponse, messageResponse} from "../resources/response";

class UserController{
    constructor(private readonly userService = UserService,) {}
    Me = async (req: Request, res: Response): Promise<UserResponse> => {
        const user = await this.userService.FindById(req.user._id)

        return new UserResponse(res , user)
    }

    Update = async (req: Request, res: Response): Promise<JsonResponse<messageResponse>> => {
        try {
            const id = req.user._id
            const body = req.body;


            await this.userService.Update(id, body)

            return new JsonResponse(res,{
                message: "update user success"
            });
        }catch (e) {
            return new ErrorResponse(res , e as Error)
        }
    }

    Destroy = async (req: Request, res: Response): Promise<JsonResponse<messageResponse>> => {
        try {
            const id = req.user._id

            await this.userService.Destroy(id)

            return new JsonResponse(res, {
                message: "delete user success"
            });

        }catch (e) {
            return new ErrorResponse(res , e as Error)
        }
    }
}

export default new UserController