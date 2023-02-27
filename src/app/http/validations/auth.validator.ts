import {checkSchema} from "express-validator"
import {UserModel} from "../../models/user.model";

export function RegisterValidator() {
    return checkSchema({
        first_name: {
            isString: true,
            isLength: {
                options:{min:3,max:30},
                errorMessage: 'first name should be at least 3 characters and at most 30',
            }
        },
        last_name: {
            isString: true,
            isLength: {
                options:{min:3,max:30},
                errorMessage: 'last name should be at least 3 characters and at most 30',
            }
        },
        user_name: {
            isString: {
                errorMessage: 'user_name should be at least 1 chars long',
            },
            custom: {
                options: async (user_name) => {
                    return UserModel.findOne({user_name}, {user_name: true}).then(user => {
                        if (user) {
                            return Promise.reject();
                        }
                        return Promise.resolve()
                    })
                }, errorMessage: "user_name already in use"
            },
        }, phone: {
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
            isString: true, isLength: {
                errorMessage: 'Password should be at least 6 chars long', options: {min: 6},
            },
        },
    });
}

export function LoginValidator() {
    return checkSchema({
        user_name: {
            isString: {
                errorMessage: 'user_name should be at least 1 chars long',
            },
            custom: {
                options: async (user_name) => {
                    return UserModel.findOne({user_name}, {user_name: true}).then(user => {
                        if (!user) {
                            return Promise.reject();
                        }
                        return Promise.resolve()
                    })
                },
                errorMessage: "Invalid value"
            },
        },
        password: {
            isString: {
                errorMessage: 'password should be at least 1 chars long',
            },
        },
    });
}
