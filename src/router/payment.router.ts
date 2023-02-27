import {Router} from "express";
import PaymentController from "../app/http/controllers/payment.controller";
import {Auth} from "../app/http/middlewares/Auth";
import {Gateway} from "../app/http/validations/donation.validator";
import {validationRequest} from "../app/http/middlewares/ValidationRequest";

const PaymentRouter: Router = Router()
PaymentRouter.post("/:donation_link", Auth, Gateway(), validationRequest, PaymentController.Gateway)
PaymentRouter.all("/verify", PaymentController.Verify);

export default PaymentRouter