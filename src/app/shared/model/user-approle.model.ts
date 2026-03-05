import { IUserModule } from "./user-module.model";

export interface IUserApprole {
    role?: string;
    modules?: IUserModule[];
}
