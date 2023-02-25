import {checkSchema} from "express-validator"

export function StoreValidator() {
    return checkSchema({
        link: {
            isString: {
                errorMessage: 'link should be at least 1 chars long',
            },
        },
        amount: {
            custom: {
                options: (amount: number|undefined) => {
                    if (amount == Number(amount)){
                        if (amount < 1000){
                            return Promise.reject();
                        }
                    }
                    return Promise.resolve();
                },
                errorMessage: 'amount amount should be at grater 1000',
            },
            optional: {options: {nullable: true}}

        },
    });
}

export function UpdateValidator() {
    return checkSchema({
        link: {
            isString: {
                errorMessage: 'link should be at least 1 chars long',
            },
            optional: {options: {nullable: true}}
        },
        amount: {
            isNumeric: true,
            custom: {
                options: (amount: number|undefined) => {
                    if (amount == Number(amount)){
                        if (amount < 1000){
                            return Promise.reject();
                        }
                    }
                    return Promise.resolve();
                },
                errorMessage: 'amount amount should be at grater 1000',
            },
            optional: {options: {nullable: true}}
        },
    });
}
