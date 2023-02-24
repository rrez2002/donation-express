import UserController from "../app/http/controllers/user.controller";
import {Router} from "express";
import {Auth} from "../app/http/middlewares/Auth";

const userRouter: Router = Router()

userRouter.get("/me", Auth, UserController.Me)
userRouter.patch("/me", Auth, UserController.Update)
userRouter.delete("/me", Auth, UserController.Destroy)

export default userRouter;