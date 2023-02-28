import {Request, Response} from "express";
import {DonationLinkModel} from "../../models/donation.link.model";
import PaymentService from "../../services/payment.service";
import {GatewayEnum} from "../../../enums/gateway.enum";

class PaymentController {
    async Gateway (req: Request, res: Response) {
        try {
            const donation_link = req.params.donation_link

            const {amount , gateway} = req.body

            const linkModel = await DonationLinkModel.findOne({link:donation_link},{
                link:1,
                amount:1,
            })

            if (linkModel){
               if (gateway == GatewayEnum.PAYIR){
                   const result = await PaymentService.payIrGateway(amount, req.user.phone)

                   return res.json(result)
               }
            }

            return res.status(404).json({
                message: "donation_link not found"
            });

        }catch (e) {
            return res.status(400).json(e)
        }

    }

    async Verify(req: Request, res: Response) {

    }
}

export default new PaymentController()