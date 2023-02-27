import {Request, Response} from "express";
import {PayIR} from "../../../utils/payment.gateways";
import {DonationLinkModel} from "../../models/donation.link.model";
import axios from "axios";



class PaymentController {
    async Gateway (req: Request, res: Response) {
        const donation_link = req.params.donation_link

        const linkModel = await DonationLinkModel.findOne({link:donation_link},{
            link:1,
            amount:1,
        })

        if (linkModel){
            const amount:number = req.body.amount
            await axios.post(PayIR.sendData.url, JSON.stringify({
                api: PayIR.merchantId,
                amount: amount*10,
                redirect: PayIR.callbackUrl,
                mobile: req.user.phone,
            })).then(response => {
                console.log(response.data)
            }).catch(err => {
                console.log(err.response.data)
            })
        }

        return res.json(PayIR)

    }

    async Verify(req: Request, res: Response) {

    }
}

export default new PaymentController()