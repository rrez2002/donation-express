import {DonationLink} from "../../models/donation.link.model";
import {Request, Response} from "express";
import {ErrorResponse} from "../resources/error.response";
import DonationLinkService from "../../services/donation.link.service";
import {Types} from "mongoose";
import {DonationLinkCollection, DonationLinkResponse} from "../resources/donation.link.response";
import {JsonResponse, messageResponse} from "../resources/response";

class DonationLinkController {
    async Index(req: Request, res: Response) {
        try {
            const user_id = req.user._id
            const donationLinks: DonationLink[] = await DonationLinkService.Find({user_id});

            console.log(typeof donationLinks)
            return new DonationLinkCollection(res, donationLinks)
        }catch (e) {
            return new ErrorResponse(res, e as Error);
        }
    }

    async Find(req: Request, res: Response): Promise<DonationLinkResponse|ErrorResponse> {
        try {
            const link_id: string = req.params.id;

            const donationLink = await DonationLinkService.FindById(new Types.ObjectId(link_id));

            if (!donationLink) return new ErrorResponse(res, {
                    message: "donation_link not found"
                }, 404);

            return new DonationLinkResponse(res, donationLink);
        }catch (e) {
            return new ErrorResponse(res, e as Error);
        }
    }

    async Store(req: Request, res: Response): Promise<JsonResponse<messageResponse>> {
        try {
            const {link, amount} = req.body

            const userId = req.user._id

            await DonationLinkService.Create({
                user_id: new Types.ObjectId(userId),
                link,
                amount,
            })

            return new JsonResponse(res, {
                message: "create donation_link success"
            }, 201);
        } catch (e) {
            return new ErrorResponse(res,e as Error)
        }
    }

    async Update(req: Request, res: Response): Promise<JsonResponse<messageResponse>> {
        try {
            const link_id = req.params.id
            const body = req.body

            await DonationLinkService.Update(new Types.ObjectId(link_id) ,body)

            return new JsonResponse(res,{
                message: "update donation_link success"
            });
        }catch (e) {
            return new ErrorResponse(res,e as Error)
        }
    }

    async Destroy(req: Request, res: Response): Promise<JsonResponse<messageResponse>> {
        try {
            const link_id = req.params.id

            await DonationLinkService.Destroy(new Types.ObjectId(link_id))

            return new JsonResponse(res, {
                message: "delete donation_link success"
            });
        }catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }
}

export default new DonationLinkController