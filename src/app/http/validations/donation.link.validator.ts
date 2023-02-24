import {checkSchema} from "express-validator"

export function StoreValidator() {
    return checkSchema({
        link: {
            isString: {
                errorMessage: 'link should be at least 1 chars long',
            },
        },
        password: {
            isNumeric: {
                errorMessage: 'amount should be at least 1 chars long',
            },
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
        password: {
            isNumeric: {
                errorMessage: 'amount should be at least 1 chars long',
            },
            optional: {options: {nullable: true}}
        },
    });
}
