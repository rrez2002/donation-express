import {Model, model, Schema, Types} from "mongoose";

export enum PaymentEnum {
    Success = "success",
    Failed = "failed",
    Pending = "pending"
}

interface IPayment {
    user_id: Types.ObjectId,
    amount: number,
    description?: string,
    validCardNumber: string,
    status: PaymentEnum,
}

interface IPaymentMethod {

}


export type Payment = IPayment & IPaymentMethod

type PaymentModel = Model<IPayment, {}, IPaymentMethod>;

const PaymentSchema = new Schema<IPayment, PaymentModel, IPaymentMethod>({
    user_id: {type: Schema.Types.ObjectId, ref: "User", required: true},
    amount: {type: Schema.Types.Number, min: 1000},
    description: {type: Schema.Types.String},
    validCardNumber: {type: Schema.Types.String, enum: PaymentEnum},
}, {
    timestamps: true
});

export const PaymentModel: PaymentModel = model<IPayment, PaymentModel>("Payment", PaymentSchema);