import {donationLinkType} from "../typeDefs/donation.link.type";
import {GraphQLList, GraphQLString} from "graphql/type";
import {AuthGraphQL} from "../middlewares/Auth";
import DonationLinkService from "../../services/donation.link.service";
import {Types} from "mongoose";
import {GraphQLContext} from "../index.graphql";

interface DonationLinksArgs {
    user_id: string
}

interface DonationLinkArgs {
    link_id: string
}

export const donationLinksResolver = {
    type: new GraphQLList(donationLinkType),
    resolve: async (parent: any, args: DonationLinksArgs, context: GraphQLContext) => {
        const {request} = context
        await AuthGraphQL(request)
        return DonationLinkService.Find({user_id:request.user._id});
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
        })
    }
};