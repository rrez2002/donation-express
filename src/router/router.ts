import {Router} from "express";
import AuthRouter from "./auth.router";
import UserRouter from "./user.router";
import DonationLinkRouter from "./donation.link.router";
import PaymentRouter from "./payment.router";

const router : Router = Router()
router.use("/auth",AuthRouter)
router.use("/user",UserRouter)
router.use("/donation_link",DonationLinkRouter)
router.use("/payment",PaymentRouter)

export default router