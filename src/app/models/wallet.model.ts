import {Model, model, Schema, Types} from "mongoose";
import {IPayment} from "./payment.model";

type Wallet = IWallet & IWalletMethods

interface IWallet {
    _id: Types.ObjectId
    user_id: Types.ObjectId
    amount: number
    transactions: Transactions[]
}

type Transactions = Pick<IPayment, "authority"|"amount">

interface IWalletMethods {}

type WalletModel = Model<IWallet, {}, IWalletMethods>;

const WalletSchema = new Schema<IWallet, WalletModel, IWalletMethods>({
    user_id: {type: Schema.Types.ObjectId, ref: "User", required: true},
    amount: {type: Number, required: true},
    transactions: []
})

const walletModel: WalletModel = model<IWallet, WalletModel>("Wallet", WalletSchema);

export {
    Wallet,
    IWallet,
    walletModel
}