import {Types} from "mongoose";
import {Response as ExpressResponse} from "express";
import {Response} from "./response";
import {DonationLink} from "../../models/donation.link.model";


export interface IDonationLinkResponse {
    _id?: Types.ObjectId
    link: String,
    amount: number|null,
}

export class DonationLinkResponse extends Response<DonationLink>{
    constructor(
        public res: ExpressResponse,
        public data: DonationLink,
        public status: number = 200,
    ) {
        super(res, data, status);
        this.toJson<IDonationLinkResponse>()
    }

    toJson<R>(): ExpressResponse<R> {
        return this.res.status(this.status).json(this.data)
    }

}
export class DonationLinkCollection extends Response<DonationLink[]>{
    constructor(
        public res: ExpressResponse,
        public data: DonationLink[],
        public status: number = 200,
    ) {
        super(res, data, status);
        this.toJson<IDonationLinkResponse[]>();
    }

    toJson<R>(): ExpressResponse<R> {
        return this.res.status(this.status).json({
            data: this.data
        })
    }
}