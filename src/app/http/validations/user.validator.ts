import {checkSchema} from "express-validator";
import {UserModel} from "../../models/user.model";

export function UpdateValidator(){
    return checkSchema({
        first_name: {
            isString: true,
            optional: { options: { nullable: true } },
        },
        last_name: {
            isString: true,
            optional: { options: { nullable: true } },
        },
        user_name: {
            isString: true,
            custom: {
                options: async (user_name) => {
                    const user = await UserModel.findOne({user_name},{user_name:true})
                    if (user){
                        return Promise.reject();
                    }
                    return Promise.resolve()
                },
                errorMessage: "user_name already in use"
            },
            optional: { options: { nullable: true } },
        },
        phone: {
            isString: {
                errorMessage: 'phone should be at least 1 chars long',
            },
            isMobilePhone: {
                options: "fa-IR", errorMessage: 'Must provide a valid IR phone number.'
            },
            custom: {
                options: async (phone) => {
                    return UserModel.findOne({phone}, {phone: true}).then(user => {
                        if (user) {
                            return Promise.reject();
                        }
                        return Promise.resolve()
                    })
                },
                errorMessage: "phone already in use"
            },
        },
        password: {
            isString: true,
            isLength: {
                errorMessage: 'Password should be at least 6 chars long',
                options: { min: 6 },
            },
            optional: { options: { nullable: true } },
        },
    });
}
