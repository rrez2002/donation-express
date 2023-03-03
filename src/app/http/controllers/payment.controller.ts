import {Request, Response} from "express";
import {DonationLinkModel} from "../../models/donation.link.model";
import PaymentService from "../../services/payment.service";
import {GatewayEnum} from "../../../utils/payment.gateways";
import {ErrorResponse} from "../resources/error.response";
import {JsonResponse} from "../resources/response";

class PaymentController {
    async Gateway (req: Request, res: Response) {
        try {
            const donation_link = req.params.donation_link

            const {amount , gateway} = req.body

            const linkModel = await DonationLinkModel.findOne({link:donation_link},{
                link:1,
                amount:1,
            })

            if (!linkModel) return new ErrorResponse(res,{
                message: "donation_link not found"
            }, 404)


            if (gateway == GatewayEnum.PAYIR) {
                const result = await PaymentService.payIrGateway(amount, req.user.phone)

                return new JsonResponse(res, result)
            }

            return new JsonResponse(res, {})

        }catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }

    async Verify(req: Request, res: Response) {

    }
}

export default new PaymentController()