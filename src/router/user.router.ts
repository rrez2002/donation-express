import UserController from "../app/http/controllers/user.controller";
import {Router} from "express";
// import {FindById} from "../app/http/middlewares/FindById";

const userRouter : Router = Router()

userRouter.get("/", UserController.Index)
userRouter.get("/:id", UserController.Find)
userRouter.patch("/:id", UserController.Update)
userRouter.delete("/:id", UserController.Destroy)

export default userRouter;