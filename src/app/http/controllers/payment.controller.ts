import {Request, Response} from "express";
import PaymentService from "../../services/payment.service";
import {GatewayEnum} from "../../../utils/payment.gateways";
import {ErrorResponse} from "../resources/error.response";
import DonationLinkService from "../../services/donation.link.service";
import {GatewayResponse} from "../resources/payment.response";
import {JsonResponse} from "../resources/response";

class PaymentController {
    constructor(
        private readonly donationLinkService=  DonationLinkService,
        private readonly paymentService = PaymentService,
        ) {}
    Gateway = async (req: Request, res: Response) => {
        try {
            const donation_link = req.params.donation_link
            const {amount, gateway, description, name, phone} = req.body

            const linkModel = await this.donationLinkService.FindByLink({
                link: donation_link
            })

            if (!linkModel) return new ErrorResponse(res, {
                message: "donation_link not found"
            }, 404)


            const result = await this.paymentService.Gateway({
                amount, phone, description
            }, gateway)

            await this.paymentService.SaveTransaction({
                name: name, phone: phone, amount,
                authority: result.token, description,
                user_id: linkModel.user_id
            })

            return new GatewayResponse(res, {
                method: "GET", url: result.token, gateway
            })

        } catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }

    Verify = async (req: Request, res: Response) => {
        const {gateway} = req.params;
        let {status, token, authority} = req.query
        token = token ?? authority;
        try {
            await this.paymentService.Verify({
                token: token as string, status: status as string
            }, gateway as GatewayEnum)

            return new JsonResponse(res, {
                message: "donation is success"
            });
        }catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }
}

export default new PaymentController