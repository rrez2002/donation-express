import {Request, Response} from "express";
import PaymentService from "../../services/payment.service";
import {GatewayEnum, PayIR, PaymentGateway, ZarinPal} from "../../../utils/payment.gateways";
import {ErrorResponse} from "../resources/error.response";
import donationLinkService from "../../services/donation.link.service";
import {GatewayResponse} from "../resources/payment.response";

class PaymentController {
    async Gateway(req: Request, res: Response) {
        try {
            const donation_link = req.params.donation_link
            const user = req.user;
            const {amount, gateway, description, name, phone} = req.body

            const linkModel = await donationLinkService.FindByLink({
                link: donation_link
            })

            if (!linkModel) return new ErrorResponse(res, {
                message: "donation_link not found"
            }, 404)


            const result = await PaymentService.Gateway({
                amount, phone: user.phone, description
            }, await this.getGateway(gateway))

            await PaymentService.SaveTransaction({
                name: user.fullName() ?? name, phone: user.phone ?? phone, amount, authority: result.token, description,
            })

            return new GatewayResponse(res, {
                method: "GET", url: result.token, gateway
            })

        } catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }

    async Verify(req: Request, res: Response) {

    }

    private async getGateway(gateway: GatewayEnum): Promise<PaymentGateway> {
        switch (gateway) {
            case GatewayEnum.PAYIR:
                return PayIR;
            case GatewayEnum.ZARINPAL:
                return ZarinPal;
        }
    }
}

export default new PaymentController()