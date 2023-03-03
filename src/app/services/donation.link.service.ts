import {DonationLink, DonationLinkModel, IDonationLink} from "../models/donation.link.model";

export default new class DonationLinkService {
    async Find(user_id: Pick<IDonationLink, "_id">) {
        try {
            const donationLinks: DonationLink[] = await DonationLinkModel.find({user_id}, {
                link: 1, amount: 1
            })

            return Promise.resolve(donationLinks)
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }

    async FindById(link_id: Pick<IDonationLink, "_id">) {
        try {
            const donationLink = await DonationLinkModel.findOne({_id: link_id}, {
                link: 1, amount: 1
            })

            return Promise.resolve(donationLink)
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }

    async Create(data: Omit<IDonationLink, "_id">) {
        try {
            await DonationLinkModel.create(data)

            return Promise.resolve()
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }

    async Update(link_id: Pick<IDonationLink, "_id">, data: Partial<IDonationLink>) {
        try {
            const donationLink = await this.FindById(link_id)

            if (!donationLink) return Promise.reject({
                message: "donation_link not found"
            });

            await DonationLinkModel.updateOne({_id: link_id}, {
                $set: data
            });

            return Promise.resolve()
        } catch (e) {
            return Promise.reject({
                message: (e as Error).message
            });
        }
    }

    async Destroy(link_id: Pick<IDonationLink, "_id">) {
        try {
            const donationLink = await DonationLinkModel.deleteOne({_id: link_id})

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