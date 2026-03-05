import { IUserApprole } from "./user-approle.model";

export interface IUserDetail {
    firstName?: string;
    lastName?: string;
    username?: string;
    userKey?: string;
    emailId?: string;
    userType?: string;
    roleActions?: string[];
    profileAttachmentUuid?: string;
    accessRole?: IUserApprole;
    pmi?: boolean;
}
