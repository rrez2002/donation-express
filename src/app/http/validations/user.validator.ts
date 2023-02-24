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
                    return !user;
                },
                // errorMessage: ""
            },
            optional: { options: { nullable: true } },
        },
        phone: {
            isString: true,
            custom: {
                options: async (phone) => {
                    const user = await UserModel.findOne({phone},{phone:true})
                    return !user;
                },
                // errorMessage: ""
            },
            optional: { options: { nullable: true } },
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
