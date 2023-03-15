import { CreateDTO, FindByIdDTO, FindByLinkDTO, FindDTO, UpdateDTO } from "../http/dtos/donation.link.dto";
import {DonationLink, DonationLinkModel} from "../models/donation.link.model";

export default new class DonationLinkService {
    async Find(query: FindDTO) {
        try {
            const donationLinks: DonationLink[] = await DonationLinkModel.find({query}, {
                link: 1, amount: 1
            })

            return Promise.resolve(donationLinks)
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }

    async FindById(query: FindByIdDTO) {
        try {
            const donationLink = await DonationLinkModel.findOne({query}, {
                link: 1, amount: 1
            })

            return Promise.resolve(donationLink)
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }

    

    async FindByLink(query: FindByLinkDTO) {
        try {
            const donationLink = await DonationLinkModel.findOne({query}, {
                link: 1, amount: 1
            })

            return Promise.resolve(donationLink)
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }

    async Create(data: CreateDTO) {
        try {
            await DonationLinkModel.create(data)

            return Promise.resolve()
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }

    async Update(query: FindByIdDTO, data: UpdateDTO) {
        try {
            const donationLink = await DonationLinkModel.updateOne({query}, {
                $set: data
            });

            if (!donationLink.modifiedCount) return Promise.reject({
                message: "donation_link not found"
            });

            return Promise.resolve()
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }

    async Destroy(query: FindByIdDTO) {
        try {
            const donationLink = await DonationLinkModel.deleteOne({query})

            if (donationLink.deletedCount) {
                return Promise.resolve()
            }
            return Promise.reject({
                message: "donation_link not found"
            })
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }
}