import {Router} from "express";
import AuthController from "../app/http/controllers/auth.controller";
import {RegisterValidator} from "../app/http/validations/auth.validator";
import {validationRequest} from "../app/http/middlewares/ValidationRequest";

const router = Router()
router.post("/register", RegisterValidator(),validationRequest, AuthController.Register)

export default router;