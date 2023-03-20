import {GraphQLInt, GraphQLString} from "graphql/type";
import {messageType} from "../typeDefs/message.type";
import PaymentService from "../../services/payment.service";
import {GatewayDTO} from "../../http/dtos/payment.dto";
import {GatewayEnum, PayIR, PaymentGateway, ZarinPal} from "../../../utils/payment.gateways";
import donationLinkService from "../../services/donation.link.service";

const getGateway = async (gateway: GatewayEnum): Promise<PaymentGateway> => {
    switch (gateway) {
    case GatewayEnum.PAYIR:
        return PayIR;
    case GatewayEnum.ZARINPAL:
        return ZarinPal;
    }
}

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

        const {amount, gateway, description, phone, name} = args

        const linkModel = await donationLinkService.FindByLink({
            link: args.link
        })

        if (!linkModel) return {
            message: "donation_link not found"
        }

        const result = await PaymentService.Gateway({
            amount, phone: phone, description
        }, await getGateway(gateway as GatewayEnum))

        await PaymentService.SaveTransaction({
            name, phone, amount, authority: result.token, description,
        })

        return {
            method: "GET", url: result.token, gateway
        };
    }
};