import { IDonationLink } from "../../models/donation.link.model";

type FindDTO = Pick<IDonationLink, "user_id">;
type FindByIdDTO = Pick<IDonationLink, "_id">;
type FindByLinkDTO = Pick<IDonationLink, "link">;
type CreateDTO = Omit<IDonationLink, "_id">;
type UpdateDTO = Partial<IDonationLink>;

export {
    FindDTO,
    FindByIdDTO,
    FindByLinkDTO,
    CreateDTO,
    UpdateDTO,
}