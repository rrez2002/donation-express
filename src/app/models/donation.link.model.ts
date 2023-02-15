import {model, Model, Schema, Types} from "mongoose";

interface IDonationLink {
    user_id: Types.ObjectId,
    link: String,
    amount: number | null
}

interface IDonationLinkMethods {
    generateLink(): string;
}

export type DonationLink = IDonationLink & IDonationLinkMethods;

type DonationLinkModel = Model<IDonationLink, {}, IDonationLinkMethods>;

const DonationLinkSchema = new Schema<IDonationLink, DonationLinkModel, IDonationLinkMethods>({
    user_id: {type: Schema.Types.ObjectId, ref: "User", required: true},
    link: {type: Schema.Types.String, required: true, unique: true},
    amount: {type: Schema.Types.Number, default: 0, min:1}
});

DonationLinkSchema.method('generateLink', function generateLink() :String {
    return ``;
});

export const DonationLinkModel: DonationLinkModel = model("DonationLink", DonationLinkSchema)