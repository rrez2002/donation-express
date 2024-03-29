import {GraphQLInt, GraphQLString} from "graphql/type";
import {messageType} from "../typeDefs/message.type";
import PaymentService from "../../services/payment.service";
import {GatewayDTO} from "../../http/dtos/payment.dto";
import {GatewayEnum} from "../../../utils/payment.gateways";
import donationLinkService from "../../services/donation.link.service";

export const gatewayResolver = {
    type: messageType,
    args: {
        link: {type: GraphQLString},
        name: {type: GraphQLString},
        phone: {type: GraphQLString},
        amount: {type: GraphQLInt},
        description: {type: GraphQLString},
        email: {type: GraphQLString},
        validCardNumber: {type: GraphQLString},
        gateway: {type: GraphQLString},
    },
    resolve: async (parent: any, args: GatewayDTO & {gateway: string, name: string, link: string}) => {
        try {
            const {amount, gateway, description, phone, name} = args

            const linkModel = await donationLinkService.FindByLink({
                link: args.link
            },{link:1})

            if (!linkModel) return {
                message: "donation_link not found"
            }

            const result = await PaymentService.Gateway({
                amount, phone, description
            }, gateway as GatewayEnum)

            await PaymentService.SaveTransaction({
                name, phone, amount, authority: result.token,
                description, user_id: linkModel.user_id
            })

            return {
                method: "GET", url: generateUrl(result.token, gateway)
            };
        }catch (e) {
            return (e as Error).message
        }
    }
};

function generateUrl(gateway:GatewayEnum,authority:string): string {
    switch (gateway) {
        case GatewayEnum.PAYIR:
            return `https://pay.ir/pg/${authority}`
        case GatewayEnum.ZARINPAL: {
            return `https://www.zarinpal.com/pg/StartPay/${authority}`
        }
    }
}