import {body} from "express-validator"

export function RegisterValidator(){
    return [
        body("first_name").notEmpty(),
        body("last_name").notEmpty().custom((value) => {
            if (value)
                return true;
            throw "invalid data";
        }),
        body("user_name").notEmpty().isLength({min:3}),
        body("phone").isMobilePhone("fa-IR"),
        body("password").notEmpty().isLength({min:6}),
    ]
}
