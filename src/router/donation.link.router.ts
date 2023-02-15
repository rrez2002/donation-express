import {Router} from "express";
import DonationLinkController from "../app/http/controllers/donation.link.controller";
import {Auth} from "../app/http/middlewares/Auth";
import {StoreValidator} from "../app/http/validations/donation.link.validator";
import {validationRequest} from "../app/http/middlewares/ValidationRequest";

const donationLinkRouter: Router = Router()

donationLinkRouter.get("/", Auth, DonationLinkController.Index)
donationLinkRouter.get("/:id", Auth, DonationLinkController.Find)
donationLinkRouter.post("/",StoreValidator(),validationRequest, Auth, DonationLinkController.Store)
donationLinkRouter.patch("/:id", Auth, DonationLinkController.Update)
donationLinkRouter.delete("/:id", Auth, DonationLinkController.Destroy)


export default donationLinkRouter;