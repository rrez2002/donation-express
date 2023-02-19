import {Router} from "express";
import AuthController from "../app/http/controllers/auth.controller";
import {LoginValidator, RegisterValidator} from "../app/http/validations/auth.validator";
import {Auth} from "../app/http/middlewares/Auth";
import {validationRequest} from "../app/http/middlewares/ValidationRequest";

const authRouter: Router = Router()
authRouter.post("/register", RegisterValidator(), validationRequest, AuthController.Register)
authRouter.post("/login", LoginValidator(), validationRequest, AuthController.Login)
authRouter.post("/refresh", AuthController.RefreshToken)
authRouter.post("/logout", Auth, AuthController.Logout)

export default authRouter;