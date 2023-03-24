import {donationLinkType} from "../typeDefs/donation.link.type";
import {GraphQLList, GraphQLString} from "graphql/type";
import {AuthGraphQL} from "../middlewares/Auth";
import DonationLinkService from "../../services/donation.link.service";
import {Types} from "mongoose";
import {GraphQLContext} from "../index.graphql";
import { ReadDonationLinkData} from "../../helpers/read.data";

interface DonationLinksArgs {
    user_id: string
}

interface DonationLinkArgs {
    link_id: string
}

const readData : ReadDonationLinkData = {
    _id : 1,
    link: 1,
    user_id: 1,
    amount: 1
}

export const donationLinksResolver = {
    type: new GraphQLList(donationLinkType),
    resolve: async (parent: any, args: DonationLinksArgs, context: GraphQLContext) => {
        const {request} = context
        await AuthGraphQL(request)
        return DonationLinkService.Find({user_id:request.user._id},readData);
    }
};
export const donationLinkResolver = {
    type: donationLinkType,
    args: {
        link_id: {type: GraphQLString}
    },
    resolve: async (parent: any, args: DonationLinkArgs) => {
        return DonationLinkService.FindById({
            _id: new Types.ObjectId(args.link_id)
        }, readData)
    }
};