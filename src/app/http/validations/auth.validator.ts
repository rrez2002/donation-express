import {body} from "express-validator"
import {UserModel} from "../../models/user.model";

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

export function LoginValidator(){
    return [
        body("user_name").notEmpty().custom(async user_name => {
            const user = await UserModel.findOne({user_name})
            if (user) {
                return true;
            }
            throw "invalid user name"

        }),
        body("password").notEmpty(),
    ]
}
