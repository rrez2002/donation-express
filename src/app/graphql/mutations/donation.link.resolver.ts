import {GraphQLInt, GraphQLString} from "graphql/type";
import {AuthGraphQL} from "../middlewares/Auth";
import DonationLinkService from "../../services/donation.link.service";
import {messageType} from "../typeDefs/message.type";
import {GraphQLContext} from "../index.graphql";

interface DonationLinkArgs {
    link: string,
    amount: number|null
}


export const createDonationLinkResolver = {
    type: messageType,
    args: {
        link: {type: GraphQLString},
        amount: {type: GraphQLInt},
    },
    resolve: async (parent: any, args: DonationLinkArgs, context: GraphQLContext) => {
        const {request} = context
        await AuthGraphQL(request)

        await DonationLinkService.Create({
            user_id: request.user._id,
            link: args.link,
            amount: args.amount
        });

        return {
            message: "create donation_link success"
        };
    }
};