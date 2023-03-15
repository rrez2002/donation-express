import {checkSchema} from "express-validator"
import {GatewayEnum} from "../../../utils/payment.gateways";
// import {DonationLinkModel} from "../../models/donation.link.model";

export function Gateway() {
    return checkSchema({
        gateway: {
            isString: true,
            custom:{
                options: async (value: any) => {
                    if (Object.values(GatewayEnum).includes(value)){
                        return Promise.resolve()
                    }
                    return Promise.reject();
                },
                errorMessage: 'gateway is undefined',
            }
        },
        amount: {
            isNumeric: true,
            custom: {
                options: async (amount: number) => {
                    //todo:check amount to linkModel.amount

                    // console.log(linkModel.amount)
                    // if (amount != linkModel.amount){
                    //     return Promise.reject();
                    // }else {
                        if (amount < 1000){
                            return Promise.reject();
                        }
                        return Promise.resolve();
                    // }
                },
                errorMessage: 'amount should be at grater 1000',
            },
        },
        description: {
            isString: true,
            optional: { options: { nullable: true } },
        },
    });
}
