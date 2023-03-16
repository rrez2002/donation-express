import {Request, Response} from "express";
import PaymentService from "../../services/payment.service";
import {GatewayEnum} from "../../../utils/payment.gateways";
import {ErrorResponse} from "../resources/error.response";
import donationLinkService from "../../services/donation.link.service";
import { GatewayResponse } from "../resources/payment.response";
import {JsonResponse} from "../resources/response";

class PaymentController {
    async Gateway (req: Request, res: Response) {
        try {
            const donation_link = req.params.donation_link
            const user = req.user;
            const {amount , gateway, description, name, phone} = req.body

            const linkModel = await donationLinkService.FindByLink({
                link:donation_link
            })

            if (!linkModel) return new ErrorResponse(res,{
                message: "donation_link not found"
            }, 404)


            if (gateway == GatewayEnum.PAYIR) {
                const result = await PaymentService.payIrGateway({
                    amount,
                    phone:user.phone,
                    description
                })

                await PaymentService.SaveTransaction({
                    name:user.fullName() ?? name,
                    phone:user.phone ?? phone,
                    amount,
                    authority: result.token,
                    description,
                })

                return new GatewayResponse(res, {
                    method: "GET",
                    url: result.token,
                    gateway
                })
            }

            return new ErrorResponse(res, {
                message: "gateway not found"
            })

        }catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }

    async Verify(req: Request, res: Response) {

    }
}

export default new PaymentController()