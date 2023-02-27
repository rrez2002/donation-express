import {checkSchema} from "express-validator"
// import {DonationLinkModel} from "../../models/donation.link.model";
// import {Request, Response} from "express";

export function Gateway() {
    return checkSchema({
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
    });
}
