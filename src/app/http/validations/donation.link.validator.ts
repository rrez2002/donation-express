import {body} from "express-validator"

export function StoreValidator() {
    return [body("link").isString().notEmpty(),
        body("amount").custom(value => {
            if ((Number(value) && !isNaN(value)) || value.trim() === '')
                return true

            throw "Invalid value";
        })
    ]
}

export function UpdateValidator() {
    return [
        body("link").isString(),
        body("amount").custom(value => {
            if ((Number(value) && !isNaN(value)) || value.trim() === '')
                return true

            throw "Invalid value";
        }),
    ]
}
