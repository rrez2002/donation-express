import {DonationLink} from "../../models/donation.link.model";
import {Request, Response} from "express";
import {ErrorResponse} from "../resources/error.response";
import DonationLinkService from "../../services/donation.link.service";
import {Types} from "mongoose";
import {DonationLinkCollection, DonationLinkResponse} from "../resources/donation.link.response";
import {JsonResponse, messageResponse} from "../resources/response";

class DonationLinkController {
    constructor(private readonly donationLinkService = DonationLinkService ) {}
    Index = async (req: Request, res: Response) => {
        try {
            const user_id = req.user._id
            const donationLinks: DonationLink[] = await this.donationLinkService.Find({user_id});

            console.log(typeof donationLinks)
            return new DonationLinkCollection(res, donationLinks)
        }catch (e) {
            return new ErrorResponse(res, e as Error);
        }
    }

    Find = async (req: Request, res: Response): Promise<DonationLinkResponse|ErrorResponse> => {
        try {
            const link_id: string = req.params.id;

            const donationLink = await this.donationLinkService.FindById(new Types.ObjectId(link_id));

            if (!donationLink) return new ErrorResponse(res, {
                    message: "donation_link not found"
                }, 404);

            return new DonationLinkResponse(res, donationLink);
        }catch (e) {
            return new ErrorResponse(res, e as Error);
        }
    }

    Store = async (req: Request, res: Response): Promise<JsonResponse<messageResponse>> => {
        try {
            const {link, amount} = req.body

            const userId = req.user._id

            await this.donationLinkService.Create({
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

    Update = async (req: Request, res: Response): Promise<JsonResponse<messageResponse>> => {
        try {
            const link_id = req.params.id
            const body = req.body

            await this.donationLinkService.Update(new Types.ObjectId(link_id) ,body)

            return new JsonResponse(res,{
                message: "update donation_link success"
            });
        }catch (e) {
            return new ErrorResponse(res,e as Error)
        }
    }

    Destroy = async (req: Request, res: Response): Promise<JsonResponse<messageResponse>> => {
        try {
            const link_id = req.params.id

            await this.donationLinkService.Destroy(new Types.ObjectId(link_id))

            return new JsonResponse(res, {
                message: "delete donation_link success"
            });
        }catch (e) {
            return new ErrorResponse(res, e as Error)
        }
    }
}

export default new DonationLinkController