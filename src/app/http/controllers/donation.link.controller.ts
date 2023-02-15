import {DonationLink, DonationLinkModel} from "../../models/donation.link.model";
import {Request, Response} from "express";

class DonationLinkController {
    async Index(req: Request, res: Response): Promise<Response> {
        const user_id = req.user._id
        const donationLinks: DonationLink[] = await DonationLinkModel.find({user_id})
        console.log(donationLinks)

        return res.json(donationLinks)
    }

    async Find(req: Request, res: Response): Promise<Response> {
        const user_id = req.user._id
        const link_id = req.params.id

        const donationLink = await DonationLinkModel.findOne({user_id,_id:link_id})

        if (donationLink){
            return res.status(200).json(donationLink);
        }

        return res.status(404).json({})
    }

    async Store(req: Request, res: Response): Promise<Response> {
        try {
            const {link, amount} = req.body

            const userId = req.user._id

            await DonationLinkModel.create({
                user_id: userId,
                link,
                amount
            })

            return res.status(201).json({})
        } catch (e) {
            return res.status(400).json(e)
        }
    }

    async Update(req: Request, res: Response): Promise<Response> {
        return res.json({})
    }

    async Destroy(req: Request, res: Response): Promise<Response> {
        const link_id = req.params.id

        const donationLink = await DonationLinkModel.deleteOne({_id:link_id})

        if (donationLink.deletedCount){
            return res.status(200).json({});
        }

        return res.status(404).json({})
    }
}

export default new DonationLinkController